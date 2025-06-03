// const express = require("express");
// const router = express.Router();
// const Stripe = require("stripe");
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // .env ფაილიდან

// router.post("/create-checkout-session", async (req, res) => {
//   const { cartItems } = req.body;

//   const line_items = cartItems.map((item) => ({
//     price_data: {
//       currency: "usd",
//       product_data: {
//         name: item.name,
//         images: [item.image], // სურათი ჩანს Stripe checkout-ზე
//       },
//       unit_amount: Math.round(parseFloat(item.price.replace("$", "")) * 100), // სენტებში
//     },
//     quantity: item.quantity,
//   }));

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items,
//       success_url: "http://localhost:3000/success", // ✅ შეცვალე
//       cancel_url: "http://localhost:3000/cancel", // ✅ შეცვალე
//     });

//     res.json({ url: session.url }); // 👉 frontend-ზე გადამისამართებისთვის
//   } catch (error) {
//     console.error("Stripe შეცდომა:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const paypal = require("@paypal/checkout-server-sdk");
const Order = require("../Models/Order");
const sendEmail = require("../utils/sendEmail");
const {
  createPrintfulOrder,
  buildPrintfulOrderData,
} = require("../utils/printful");

// PayPal კონფიგურაცია
const Environment =
  process.env.PAYPAL_MODE === "live"
    ? paypal.core.LiveEnvironment
    : paypal.core.SandboxEnvironment;

const paypalClient = new paypal.core.PayPalHttpClient(
  new Environment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  )
);

// 1) PayPal შეკვეთის შექმნა
router.post("/create-paypal-order", async (req, res) => {
  const { cartItems } = req.body;

  const totalAmount = cartItems
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
router.post("/paypal/confirm", async (req, res) => {
  const { userData, cartItems } = req.body;
  console.log("User Data:", userData);
  console.log("Cart Items:", cartItems);
  try {
    // 🔹1. შეკვეთის Printful-ის ფორმატში ჩამოყალიბება
    const orderData = buildPrintfulOrderData(userData, cartItems);
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
    // 🔹4. MongoDB-ში Order-ის შენახვა
    const newOrder = new Order({
      user: userData,
      items: cartItems,
      total: totalAmount,
    });
    await newOrder.save();
    // ✅ EmailJS გაგზავნა
    const emailParams = {
      to_name: userData.name,
      to_email: userData.email,
      message: `Your order of $${totalAmount} has been placed successfully. Items: ${cartItems
        .map((item) => `${item.name} (x${item.quantity})`)
        .join(", ")}`,
    };
    await sendEmail(emailParams);
    // 🔹5. წარმატება
    console.log("Printful Order Created:", printfulResponse);
    res
      .status(200)
      .json({ message: "Order placed with Printful successfully." });
  } catch (error) {
    console.error("Printful Error:", error.message);
    res.status(500).json({ error: "Failed to create Printful order" });
  }
});

module.exports = router;
