/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useAppContext } from "../../Context/AppContextReducer";
import { clearCart } from "../../Context/AppActionsCreator";

const SuccessCheck = () => {
  const [animate, setAnimate] = useState(false);
  const { state, dispatch } = useAppContext();
  const cartItems = state.cartItems;

  useEffect(() => {
    setAnimate(true);

    // როცა კომპონენტი mount-დება, ვწერ აქ fetch-ს stock-ის განახლებისთვის
    const updateStock = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/server/api/stock/update-stock",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: cartItems.map((item) => ({
                printfulProductId: item.printfulProductId,
                quantity: item.quantity,
              })),
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update stock");
        }

        // stock განახლდა, ახლა კალათის გასუფთავება
        dispatch(clearCart());
      } catch (error) {
        console.error("Error updating stock:", error);
        // აქ შეგიძლია გამოიყენო UI-ში შეცდომის საჩვენებლად ცვლადი ან notification
      }
    };

    updateStock();
  }, [cartItems, dispatch]);

  return (
    <div className="flex justify-center relative top-40">
      <div className="w-full max-w-md">
        <div className="shadow-lg p-12 w-full text-center mt-10 border-b-4 border-green-500 rounded-xl ">
          <FaCheckCircle
            className={`text-6xl text-green-500 mx-auto mb-4 transition-transform duration-500 ${
              animate ? "scale-110 animate-bounce" : ""
            }`}
          />
          <h2 className="mb-3 text-3xl text-white font-medium mt-2">
            Your payment was successful
          </h2>
          <p className="text-lg text-white font-medium">
            Thank you for your payment. We will <br />
            be in contact with more details shortly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessCheck;
