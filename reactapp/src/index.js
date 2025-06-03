import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HeroUIProvider } from "@heroui/react";

import { BrowserRouter as Router } from "react-router-dom";
import AppContextReducer from "./Context/AppContextReducer";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppContextReducer>
    <Router>
      <HeroUIProvider>
        <App />
      </HeroUIProvider>
    </Router>
  </AppContextReducer>
);
