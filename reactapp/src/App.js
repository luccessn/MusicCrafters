import "./App.css";
import React from "react";

import AppRoutes from "./AppRoutes";
import NavBarHR from "./Components/Navbar/NavBarHR";
import { ShootingStars } from "./Components/Ui/stars/shooting-stars";
import { StarsBackground } from "./Components/Ui/stars/stars-background";
// import { Navbar } from "./Components/Navbar/Navbar";

function App() {
  return (
    <div className="relative min-h-screen flex flex-col bg-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <ShootingStars />
        <StarsBackground />
      </div>

      {/* Foreground */}
      <NavBarHR />
      <div className="z-10 relative">
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
//  <StarsBackground className="z-0" />
//   <ShootingStars className="z-0" />
