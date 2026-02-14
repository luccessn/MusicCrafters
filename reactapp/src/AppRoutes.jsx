/* eslint-disable prettier/prettier */
import React from "react";
import { Routes, Route } from "react-router-dom";

import { routesConfig } from "./Config/routesConfig";

const AppRoutes = () => {
  return (
    <Routes>
      {routesConfig.map((route, index) => {
        const key = route.path || `route-${index}`;
        return (
          <Route key={key} path={route.path} Component={route.Component} />
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
