/* eslint-disable prettier/prettier */
import React from "react";
import { useAppContext } from "../Context/AppContextReducer";

const AuthGuard = ({ children }) => {
  const { state } = useAppContext();
  return <>{state.isAuthanticated ? children : children}</>;
};

export default AuthGuard;
