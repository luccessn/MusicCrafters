const express = require("express");
const router = express.Router();
const paypal = require("@paypal/checkout-server-sdk");
const Order = require("../Models/Order");
const sendEmail = require("../utils/sendEmail");
const buildOrderEmail = require("../utils/buildOrderEmail");
const {
  createPrintfulOrder,
  buildPrintfulOrderData,
} = require("../utils/printful");

// ყოველთვის Live PayPal კონფიგურაცია
const paypalClient = new paypal.core.PayPalHttpClient(
  new paypal.core.LiveEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  )
);
// 1) PayPal შეკვეთის შექმნა
router.post("/create-paypal-order", async (req, res) => {
  const { cartItems, totalAmount: clientTotal } = req.body;

  // თუ clientTotal არის, გამოიყენე ის, თორემ გამოთვალე ხელახლა
  const totalAmount = clientTotal
    ? parseFloat(clientTotal).toFixed(2)
    : cartItems
        .reduce(
          (acc, item) =>
            acc + parseFloat(item.price.replace("$", "")) * item.quantity,
          0
        )
        .toFixed(2);

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: totalAmount,
        },
      },
    ],
    application_context: {
      return_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
      shipping_preference: "NO_SHIPPING",
      user_action: "PAY_NOW",
    },
  });

  try {
    const order = await paypalClient.execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    console.error("PayPal Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// 2) PayPal გადახდის დადასტურება და Printful შეკვეთის შექმნა
router.post("/confirm", async (req, res) => {
  const { userData, cartItems } = req.body;

  console.log("🟡 Received confirmation request");
  console.log("User Data:", userData);
  console.log("Cart Items:", cartItems);
  // // ⛔️ ვალიდაცია სანამ printful-ში გაგზავნით

  try {
    // 🔹1. შეკვეთის Printful-ის ფორმატში ჩამოყალიბება
    const orderData = buildPrintfulOrderData(userData, cartItems);
    console.log(
      "Prepared Printful Order Data:",
      JSON.stringify(orderData, null, 2)
    );

    // 🔹2. Printful-ზე გაგზავნა
    const printfulResponse = await createPrintfulOrder(orderData);
    // 🔹3. მთლიანი თანხის დათვლა
    const totalAmount = cartItems
      .reduce(
        (acc, item) =>
          acc + parseFloat(item.price.replace("$", "")) * item.quantity,
        0
      )
      .toFixed(2);
    //Email ის გაგზავნა
    const orderDetails = cartItems
      .map((item) => `${item.name} (x${item.quantity})`)
      .join("<br/>"); // <br/> რათა ელფოსტაში ლამაზად ჩამოილაგოს

    const message = `
     Thank you for your order! Here are the items you purchased:
      <br/><br/>
    ${orderDetails}
    <br/><br/>
     Total: $${totalAmount}
      `;
    const html = buildOrderEmail(`${userData.name}`, message);
    await sendEmail({
      to: userData.email,
      subject: "Your order confirmation",
      html,
    });
    // 🔹4. MongoDB-ში Order-ის შენახვა
    const newOrder = new Order({
      user: userData,
      items: cartItems,
      total: totalAmount,
      createdAt: new Date(),
    });
    await newOrder.save();

    // 🔹5. წარმატება
    console.log("Printful Order Created:", printfulResponse);
    res
      .status(200)
      .json({ message: "Order placed with Printful successfully." });
  } catch (error) {
    console.error("❌ Error in /paypal/confirm:", error.message);

    if (error.response) {
      console.error("❌ Printful Response Status:", error.response.status);
      console.error("❌ Printful Error Data:", error.response.data);
    } else {
      console.error("❌ General Error:", error);
    }

    const errMsg =
      error.response?.data?.message ||
      error.message ||
      "Failed to create Printful order";

    res.status(500).json({ error: errMsg });
  }
});

module.exports = router;
// return_url: "https://ferraritifo.live/success",
// cancel_url: "https://ferraritifo.live/cancel",
