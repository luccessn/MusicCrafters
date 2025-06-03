/* eslint-disable prettier/prettier */
import React from "react";
import "./notfound.css";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/");
  };
  return (
    <div className="p-60">
      <div className="tv-container">
        <div className="tv-screen">
          <div className="static"></div>
          <div>
            <div className="error-text">Wrong Page</div>
            <button className="buttonerror" onClick={goBack}>
              <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
              </span>
              <span className="button-text">BACK TO</span>
            </button>
          </div>
        </div>
        <div className="tv-stand"></div>
      </div>
    </div>
  );
};

export default NotFound;
