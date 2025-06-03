/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useAppContext } from "../../Context/AppContextReducer";
import CheckCard from "../../Components/CheckOut/CheckCard";
import "./bt1.css";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { clearCart } from "../../Context/AppActionsCreator";
import emailjs from "emailjs-com";
//phone input
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const CheckOuts = () => {
  const [promoCode, setPromoCode] = useState("");
  const isValidCode = promoCode.trim().toLowerCase() === "ms21";
  const { state, dispatch } = useAppContext();
  const [isChecked, setIsChecked] = useState(false);
  const [Data, setData] = useState({
    email: "",
    country: "",
    state: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    postalCode: "",
    city: "",
    phone: "",
  });
  // const handleCreateOrder = async () => {
  //   const res = await fetch(
  //     "http://localhost:3001/api/paypal/create-paypal-order",
  //     {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ cartItems }),
  //     }
  //   );
  // };
  const ChangeInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const cartItems = state.cartItems;
  console.log(cartItems);

  const nedliTotal = cartItems.reduce(
    (acc, item) =>
      acc + parseFloat(item.price.replace("$", "")) * item.quantity,
    0
  );

  // const totalAmount = cartItems
  //   .reduce(
  //     (acc, item) =>
  //       acc + parseFloat(item.price.replace("$", "")) * item.quantity,
  //     0
  //   )
  //   .toFixed(2);
  const totalAmount = isValidCode
    ? (nedliTotal * 0.8).toFixed(2)
    : nedliTotal.toFixed(2);
  const isFormValid = Object.entries(Data).every(
    ([key, value]) => key === "apartment" || value.trim() !== ""
  );

  return (
    <div className="flex flex-row relative gap-40 justify-center text-white py-10">
      <form className="flex flex-col gap-4 rounded-lg w-[500px]">
        {/* Payment Info */}
        <div>
          <h2 className="text-2xl mb-4 text-zinc-300">Payment Information</h2>
          <div className="flex flex-col gap-4">
            <label htmlFor="text" className="text-sm text-gray-400">
              Cardholder Email
            </label>
            <input
              name="email"
              value={Data.email}
              onChange={ChangeInput}
              type="email"
              placeholder="example@email.com"
              className="w-full bg-[#1b1b1b] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-950"
            />
          </div>
        </div>

        {/* Shipping Info */}
        <div>
          <h2 className="text-2xl mb-4 text-zinc-300">Shipping Address</h2>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-row gap-2">
              <div>
                <label htmlFor="text" className="text-sm text-gray-400">
                  First Name
                </label>
                <input
                  name="firstName"
                  value={Data.firstName}
                  onChange={ChangeInput}
                  type="text"
                  placeholder="John"
                  className="w-full bg-[#1b1b1b] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-950"
                />
              </div>
              <div>
                <label htmlFor="text" className="text-sm text-gray-400">
                  Last Name
                </label>
                <input
                  name="lastName"
                  value={Data.lastName}
                  onChange={ChangeInput}
                  type="text"
                  placeholder="Doe"
                  className="w-full bg-[#1b1b1b] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-950"
                />
              </div>
            </div>
            <div>
              <label htmlFor="text" className="text-sm text-gray-400">
                Country/Region
              </label>
              <input
                name="country"
                value={Data.country}
                onChange={ChangeInput}
                type="text"
                placeholder="Country/Region"
                className="w-full bg-[#1b1b1b] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-950"
              />
            </div>
            <div>
              <label htmlFor="text" className="text-sm text-gray-400">
                State
              </label>
              <input
                name="state"
                value={Data.state}
                onChange={ChangeInput}
                type="text"
                placeholder="State / Region"
                className="w-full bg-[#1b1b1b] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-950"
              />
            </div>

            <div>
              <label htmlFor="text" className="text-sm text-gray-400">
                Address
              </label>
              <input
                name="address"
                value={Data.address}
                onChange={ChangeInput}
                type="text"
                placeholder="Street address, building"
                className="w-full bg-[#1b1b1b] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-950"
              />
            </div>
            <div>
              <label htmlFor="text" className="text-sm text-gray-400">
                Apartment
              </label>
              <input
                name="apartment"
                value={Data.apartment}
                onChange={ChangeInput}
                type="text"
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full bg-[#1b1b1b] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-950"
              />
            </div>
            <div className="flex flex-row gap-2">
              <div>
                <label htmlFor="text" className="text-sm text-gray-400">
                  Postal Code
                </label>
                <input
                  name="postalCode"
                  value={Data.postalCode}
                  onChange={ChangeInput}
                  type="text"
                  placeholder="Postal Code"
                  className="w-full bg-[#1b1b1b] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-950"
                />
              </div>
              <div>
                <label htmlFor="text" className="text-sm text-gray-400">
                  City
                </label>
                <input
                  name="city"
                  value={Data.city}
                  onChange={ChangeInput}
                  type="text"
                  placeholder="City"
                  className="w-full bg-[#1b1b1b] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-950"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-400">Phone Number</label>
              <PhoneInput
                name="phone"
                country={"us"} // საწყისი ქვეყანა (შეგიძლია 'ge' - საქართველოსთვის)
                value={Data.phone}
                onChange={(phone) => setData((prev) => ({ ...prev, phone }))}
                inputStyle={{
                  width: "100%",
                  height: "44px",
                  backgroundColor: "#1b1b1b",
                  color: "#fff",
                  fontSize: "16px",
                  paddingLeft: "48px", // დროშის ადგილი
                  borderRadius: "8px",
                  border: "none",
                }}
                buttonStyle={{
                  backgroundColor: "#1b1b1b",
                  border: "none",
                }}
                containerStyle={{
                  width: "100%",
                }}
              />
            </div>
            <div className="cntr flex flex-row gap-5">
              <input
                type="checkbox"
                id="cbx"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <label htmlFor="cbx" className="cbx"></label>
              <p className="font-mono relative top-1"> Aggree Our Terminates</p>
            </div>
          </div>
        </div>

        {/* PayPal Button */}
        <div className="mt-10">
          <PayPalScriptProvider
            options={{
              "client-id":
                "AZinVI-5L6XyPKBe8_N5vCjLz1_WowwG9loF_rrpvAN4H8z_hz_DfsCkVMGDabchGRQ3lTHM6hChyfmv", // .env-იდან წამოსული
              currency: "USD",
            }}
          >
            <PayPalButtons
              disabled={!isFormValid}
              onClick={() => {
                // emailInfo();
                // successInfo();
              }}
              style={{
                layout: "vertical",
                color: "gold",
                shape: "rect",
                label: "paypal",
              }}
              forceReRender={[totalAmount]}
              createOrder={async () => {
                try {
                  const response = await fetch(
                    "http://localhost:3001/api/paypal/create-paypal-order",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ cartItems }),
                    }
                  );

                  const data = await response.json();

                  if (!response.ok)
                    throw new Error(data.error || "Order creation failed");

                  return data.id;
                } catch (err) {
                  console.error("PayPal createOrder Error:", err);
                  alert("Order creation failed");
                }
              }}
              onApprove={async (data, actions) => {
                try {
                  const details = await actions.order.capture();

                  // აქ წამოიღე შენი Data state (მომხმარებლის მონაცემები) და cartItems (კალათი)
                  const userData = {
                    email: Data.email,
                    name: `${Data.firstName} ${Data.lastName}`,
                    country: Data.country,
                    state: Data.state,
                    city: Data.city,
                    address1: Data.address,
                    address2: Data.apartment,
                    postalCode: Data.postalCode,
                    phone: Data.phone,
                  };

                  // უკვე გაქვს cartItems state-დან

                  // გაგზავნა backend-ში
                  const response = await fetch(
                    "http://localhost:3001/api/paypal/confirm",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ userData, cartItems }),
                    }
                  );

                  if (!response.ok) throw new Error("Failed to confirm order");

                  alert(
                    `Thank you ${details.payer.name.given_name}, payment successful!`
                  );

                  dispatch(clearCart());
                  window.location.href = "/success";
                } catch (error) {
                  console.error("Error in onApprove:", error);
                  alert("An error occurred during order confirmation.");
                }
              }}
              // onApprove={(data, actions) => {

              //   cartItems;
              //   return actions.order.capture().then((details) => {
              //     alert(
              //       `Thank you ${details.payer.name.given_name}, payment successful!`
              //     );
              //     window.location.href = "/success";
              //     dispatch(clearCart());
              //   });
              // }}
              onCancel={() => {
                window.location.href = "/cancel";
              }}
              onError={(err) => {
                console.error("PayPal Error:", err);
                alert("Payment error occurred");
              }}
            />
          </PayPalScriptProvider>
        </div>
      </form>

      {/* Right Panel: Cart Summary */}
      <div className="flex flex-col gap-8 rounded-2xl shadow-xl p-8">
        <div
          className={`flex flex-col gap-5 overflow-y-auto ${
            state.cartItems.length > 3 ? "max-h-[300px]" : ""
          }`}
        >
          {state.cartItems.map((item) => (
            <CheckCard key={item.id} props={item} />
          ))}
        </div>

        {/* Promo Code */}
        <div className="flex flex-row gap-5">
          <input
            type="text"
            placeholder="Promo Code"
            className="w-full bg-[#1b1b1b] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-950"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              if (!isValidCode) {
                alert("Invalid Promo Code");
              } else {
                alert("Promo Applied");
              }
            }}
            className={`px-5 py-2 rounded-lg font-semibold transition duration-300 ${
              isValidCode
                ? "bg-green-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            APPLY
          </button>
        </div>

        {/* Totals */}
        <div className="flex justify-between text-zinc-200">
          <h1 className="text-medium">Subtotal ·</h1>
          <h1 className="text-medium">
            {state.cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
            items
          </h1>
        </div>
        <div className="flex justify-between text-white">
          <h1 className="text-medium">Total: </h1>
          <h1 className="text-medium">${totalAmount}</h1>
        </div>
      </div>
    </div>
  );
};

export default CheckOuts;

// const emailInfo = () => {
//   console.log("checkout");
//   emailjs.send(
//     "service_t7zl5xh", // service ID
//     "template_dnxwjh9", // template ID
//     {
//       data: `
//       Email: ${Data.email}
//       Full Name: ${Data.firstName} ${Data.lastName}
//       Country: ${Data.country}
//       State: ${Data.state}
//       Address: ${Data.address}, Apartment: ${Data.apartment}
//       City: ${Data.city}, Postal Code: ${Data.postalCode}
//     `,
//       product: `
//       Cart: ${cartItems
//         .map(
//           (item) =>
//             `Name: ${item.name}, Quantity: ${item.quantity}, Size: ${item.size}`
//         )
//         .join(" | ")}
//       Total: $${totalAmount}
//     `,
//     },
//     "LXSkZ2wdpNYn9gY7q" // Public Key (user ID)
//   );
// };
// const successInfo = () => {
//   if (!Data.email || Data.email.trim() === "") {
//     console.error("Email is empty or invalid:", Data.email);
//     return; // ან დააწერე UI-ში შეცდომა, რომ ელ.ფოსტა ცარიელია
//   }

//   console.log("Sending email to admin and customer...");

//   emailjs
//     .send(
//       "service_t7zl5xh",
//       "template_uhh15tk",
//       {
//         to_email: Data.email,
//         Items: `
//   ${cartItems
//     .map(
//       (item) =>
//         ` ${item.name},  ${item.quantity},  ${item.size} , ${item.price}`
//     )
//     .join(" | ")}
//   `,
//         Total: totalAmount,
//       },
//       "LXSkZ2wdpNYn9gY7q"
//     )
//     .then(() => {
//       console.log("Email sent successfully!");
//     })
//     .catch((err) => {
//       console.error("Failed to send confirmation email.", err);
//     });
// };
