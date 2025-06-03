import "./App.css";
import React from "react";

import AppRoutes from "./AppRoutes";
import NavBarHR from "./Components/Navbar/NavBarHR";
import { ShootingStars } from "./Components/Ui/stars/shooting-stars";
import { StarsBackground } from "./Components/Ui/stars/stars-background";
// import { Navbar } from "./Components/Navbar/Navbar";

function App() {
  return (
    <div className="  relative min-h-screen flex flex-col bg-black ">
      <NavBarHR />
      <div className="z-10 relative">
        {/* <Navbar> */}
        <AppRoutes />
        {/* </Navbar> */}
      </div>
      <ShootingStars className="min-h-screen" />
      <StarsBackground className="min-h-screen" />
    </div>
  );
}

export default App;
//  <StarsBackground className="z-0" />
//   <ShootingStars className="z-0" />
