/* eslint-disable prettier/prettier */
import React from "react";
import { useAppContext } from "../../Context/AppContextReducer";
import { removeFromCart } from "../../Context/AppActionsCreator";
// import { Button, Image } from "@heroui/react";
import { Trash2 } from "lucide-react"; // აიკონები
import { UPDATE_CART_ITEM_QUANTITY } from "../../Context/AppActions";
const CartCard = ({ props }) => {
  const { dispatch } = useAppContext();
  console.log(props);
  const handleRemove = () => {
    dispatch(removeFromCart(props.id));
  };
  const increment = () => {
    dispatch({
      type: UPDATE_CART_ITEM_QUANTITY,
      payload: {
        id: props.id,
        quantity: props.quantity + 1,
      },
    });
  };

  const decrement = () => {
    if (props.quantity > 1) {
      dispatch({
        type: UPDATE_CART_ITEM_QUANTITY,
        payload: {
          id: props.id,
          quantity: props.quantity - 1,
        },
      });
    }
  };
  console.log("quantity:", props.quantity, "stock:", props.stock);
  return (
    <div className="flex flex-row items-center  justify-between py-4 border-b border-gray-200 font-mono">
      <img
        src={props.image}
        alt={props.name}
        className="w-32 h-32 object-cover rounded-md"
      />
      <div className=" flex flex-col w-44 gap-3">
        <div className="flex flex-col justify-between w-48">
          <p className="font-semibold text-black text-xl">{props.name}</p>
          <p className="text-gray-500 text-sm">{props.price}$</p>
          <p className="text-gray-400 text-xs">Color: {props.color}</p>
          <p className="text-gray-400 text-xs">Size: {props.size}</p>
        </div>

        <div className="flex items-center gap-7 flex-row">
          <div className="text-xl flex flex-row items-center gap-3 relative left-10">
            <button
              onClick={decrement}
              className={`px-3 py-1 rounded ${
                props.quantity === 1 ? "text-gray-600" : "text-white"
              }`}
            >
              -
            </button>
            <h1 className="text-white text-xl">{props.quantity}</h1>
            <button
              onClick={increment}
              className={`px-3 py-1 rounded ${
                props.quantity >= props.stock
                  ? "text-gray-600 cursor-not-allowed"
                  : "text-white"
              }`}
              disabled={props.quantity >= props.stock}
            >
              +
            </button>
          </div>

          <button
            className="text-gray-500 hover:text-red-600 ml-2"
            onClick={handleRemove}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <div className="text-right relative  -top-12">
        <p className="font-semibold text-white text-xl">
          {/* ${(props.price * props.quantity).toFixed(2)} */}
          {props?.price
            ? `${(
                props.quantity * parseFloat(props.price.replace("$", ""))
              ).toFixed(2)} $`
            : "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default CartCard;
