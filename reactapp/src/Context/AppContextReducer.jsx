/* eslint-disable prettier/prettier */
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { initials, reducer } from "./Reducer";
// 🔐 ვღებულობთ და ვშიფრავთ token-ად
const getInitialState = () => {
  const token = localStorage.getItem("cartToken");
  let cartItems = [];
  if (token) {
    try {
      const decoded = atob(token); // Base64 decode
      cartItems = JSON.parse(decoded); // parse JSON
    } catch (err) {
      console.error("Failed to decode cart token:", err);
    }
  }

  return {
    ...initials,
    cartItems,
  };
};

const AppContext = createContext();
const AppContextReducer = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initials, getInitialState);
  useEffect(() => {
    try {
      const token = btoa(JSON.stringify(state.cartItems)); // encode as Base64
      localStorage.setItem("cartToken", token);
    } catch (err) {
      console.error("Failed to encode cart items:", err);
    }
  }, [state.cartItems]);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context) {
    return context;
  }
  throw new Error("AppContex Error");
};

export default AppContextReducer;
