/* eslint-disable prettier/prettier */
import React from "react";
import { Routes, Route } from "react-router-dom";

import { routesConfig } from "./Config/routesConfig";

const AppRoutes = () => {
  return (
    <Routes>
      {routesConfig.map((route, index) => {
        const key = route.path || `route-${index}`;
        // if (route.Guard) {
        //   return (
        //     <Route
        //       key={route.path}
        //       path={route.path}
        //       element={
        //         <route.Guard>
        //           <route.Component />
        //         </route.Guard>
        //       }
        //     />
        //   );
        // }
        return (
          <Route key={key} path={route.path} Component={route.Component} />
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
