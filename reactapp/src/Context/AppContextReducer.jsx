/* eslint-disable prettier/prettier */
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { initials, reducer } from "./Reducer";

// --- ვღებულობთ და ვშიფრავთ token-ად ---
const getInitialState = () => {
  const token = localStorage.getItem("MCcartToken");
  let cartItems = [];

  if (token) {
    try {
      const decoded = decodeURIComponent(token); // ✅ ვშიფრავთ URL-encoded სტრიქონს
      cartItems = JSON.parse(decoded); // ✅ JSON parse
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
  const [state, dispatch] = useReducer(reducer, getInitialState());

  useEffect(() => {
    try {
      const token = encodeURIComponent(JSON.stringify(state.cartItems)); // ✅ ვინახავთ სწორად
      localStorage.setItem("MCcartToken", token);
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
  if (!context) {
    throw new Error("AppContext Error");
  }
  return context;
};

export default AppContextReducer;
