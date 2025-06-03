/* eslint-disable prettier/prettier */
import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorForm = ({ error }) => {
  const navigate = useNavigate();
  const backBTN = () => {
    navigate(-1);
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative flex w-80 flex-col rounded-xl bg-gradient-to-br from-black to-gray-900 bg-clip-border text-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-clip-border shadow-lg group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 opacity-90"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-20 h-20 text-white/90 transform transition-transform group-hover:scale-110 duration-300"
            >
              <path d="M12 2L1 21h22L12 2zm0 3.83L19.17 19H4.83L12 5.83zM11 16h2v2h-2zm0-6h2v4h-2z" />
            </svg>
          </div>
        </div>
        <div className="p-6">
          <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-white antialiased group-hover:text-blue-600 transition-colors duration-300">
            Form Error ! !
          </h5>
          <p className="block font-sans text-base font-light leading-relaxed text-white antialiased">
            {error}
          </p>
        </div>
        <div className="p-6 pt-0">
          <button
            className="group relative w-full inline-flex items-center justify-center px-6 py-3 font-bold text-white rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5"
            onClick={backBTN}
          >
            <span className="relative flex items-center gap-2">
              Back
              <svg
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
                className="w-5 h-5 transform transition-transform group-hover:translate-x-1"
              >
                <path
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorForm;
