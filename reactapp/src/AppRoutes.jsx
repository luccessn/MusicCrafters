/* eslint-disable prettier/prettier */
import React from "react";
import { Routes, Route } from "react-router-dom";

import { routesConfig } from "./Config/routesConfig";

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" Component={Home} />
      <Route path="/signin" Component={SignIn} />
      <Route path="/signup" Component={SignUp} />
      <Route path="/test" Component={testpage} /> */}
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
