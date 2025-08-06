/* eslint-disable prettier/prettier */
/* eslint-disable import/namespace */
/* eslint-disable prettier/prettier */

// import { jwtDecode } from "jwt-decode";
// import { toggleLocalStorage } from "../Utils/jwt";
import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREMENT,
  INCREMENT,
  REMOVE_FROM_CART,
  RESET_COUNTER,
  UPDATE_CART_ITEM_QUANTITY,
} from "./AppActions";

const initials = {
  // isAuthanticated: false,
  // user: null,
  cartItems: [],
  counter: 1,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART: {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === payload.id
      );

      if (existingIndex !== -1) {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingIndex].quantity += payload.quantity;
        return { ...state, cartItems: updatedCartItems };
      } else {
        return { ...state, cartItems: [...state.cartItems, payload] };
      }
    }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== payload),
      };
    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };
    case INCREMENT:
      return { ...state, counter: state.counter + payload };

    case DECREMENT:
      return {
        ...state,
        counter: Math.max(1, state.counter - payload),
      };
    case RESET_COUNTER:
      return {
        ...state,
        counter: 1,
      };
    case UPDATE_CART_ITEM_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === payload.id
            ? { ...item, quantity: Math.max(1, payload.quantity) }
            : item
        ),
      };
    default:
      return state;
  }
};

export { initials, reducer };
