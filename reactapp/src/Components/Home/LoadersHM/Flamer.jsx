/* eslint-disable prettier/prettier */
import React from "react";
import "./CSS/flamer.css";
const Flamer = () => {
  return (
    <div className="loader">
      <div className="head"></div>

      <div className="flames">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <div className="eye"></div>
    </div>
  );
};

export default Flamer;
