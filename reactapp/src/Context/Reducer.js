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
        // თუ უკვე არსებობს იგივე ზომის და იგივე ID-ს პროდუქტი -> განვაახლოთ რაოდენობა
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingIndex].quantity += payload.quantity;
        return { ...state, cartItems: updatedCartItems };
      } else {
        // არ არსებობს -> დავამატოთ ახალი
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
        counter: Math.max(1, state.counter - payload), // არ დავუშვათ 1-ზე ნაკლები
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
// switch (type) {
//   case AppActions.AUTHENTICATED: {
//     const user = jwtDecode(payload);
//     return { ...state, isAuthanticated: true, user: user };
//   }
//   case AppActions.LOG_IN: {
//     const { token } = payload;
//     const user = jwtDecode(token);
//     toggleLocalStorage(token);
//     return { ...state, isAuthanticated: true, user };
//   }
//   case AppActions.LOG_OUT:
//     toggleLocalStorage();
//     return { ...state, isAuthanticated: false, user: null };
//   default:
//     return state;
// }

//cart
// case AppActions.UPDATE_CART_ITEM_QUANTITY:
//       return {
//         ...state,
//         cartItems: state.cartItems.map((item) =>
//           item.id === payload.id
//             ? { ...item, quantity: payload.quantity }
//             : item
//         ),
//       };
