/* eslint-disable prettier/prettier */
/* eslint-disable import/namespace */
/* eslint-disable prettier/prettier */
import {
  ADD_TO_CART,
  AppActions,
  CLEAR_CART,
  DECREMENT,
  INCREMENT,
  REMOVE_FROM_CART,
  RESET_COUNTER,
} from "./AppActions";
export const authenticatedAction = (token) => {
  return { type: AppActions.AUTHENTICATED, payload: token };
};

export const logInAction = (data) => {
  return { type: AppActions.LOG_IN, payload: data };
};

export const logOutAction = () => {
  return { type: AppActions.LOG_OUT };
};
export const addToCart = (item) => {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
};
export const removeFromCart = (itemId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: itemId,
  };
};
export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};
export const CounterIncriment = (payload) => {
  return { type: INCREMENT, payload };
};
export const CounterDecrement = (payload) => {
  return { type: DECREMENT, payload };
};
export const CounterReset = () => {
  return { type: RESET_COUNTER };
};
