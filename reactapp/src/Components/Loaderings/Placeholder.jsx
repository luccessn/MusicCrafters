/* eslint-disable prettier/prettier */
import React from "react";

const Placeholder = () => {
  return (
    <div className="animate-pulse flex flex-col relative left-0 sfm:left-24 mmd:left-0 mmd:flex-row gap-8 px-4 py-8  justify-center">
      {/* Left side - image and preview */}
      <div className="flex flex-row gap-8">
        <div className="flex flex-col items-center gap-4">
          <div className="w-40 h-40 bg-slate-400 rounded-md"></div>
          <div className="w-40 h-40 bg-slate-400 rounded-md"></div>
          <div className="w-40 h-40 bg-slate-400 rounded-md"></div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="w-64 h-80 bg-slate-400 rounded-md"></div>
        </div>
      </div>
      {/* Right side - text info */}
      <div className="max-w-md w-full p-4  shadow dark:border-gray-400">
        <div className="h-6 bg-gray-300 rounded w-2/3 mb-4"></div>
        <div className="h-5 bg-gray-300 rounded w-1/4 mb-4"></div>

        <div className="h-4 bg-gray-300 rounded w-full mb-2.5"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2.5"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-6"></div>

        {/* Color block */}
        <div className="h-5 bg-gray-300 rounded w-1/4 mb-2.5"></div>
        <div className="flex gap-4 mb-6">
          <div className="w-8 h-8 bg-gray-300 rounded"></div>
          <div className="w-8 h-8 bg-gray-300 rounded"></div>
          <div className="w-8 h-8 bg-gray-300 rounded"></div>
        </div>

        {/* Size buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="w-12 h-8 bg-gray-300 rounded"></div>
          ))}
        </div>

        {/* Quantity */}
        <div className="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div className="flex gap-4 mb-6">
          <div className="w-8 h-8 bg-gray-300 rounded"></div>
          <div className="w-8 h-8 bg-gray-300 rounded"></div>
          <div className="w-8 h-8 bg-gray-300 rounded"></div>
        </div>

        {/* Add to cart button */}
        <div className="h-10 bg-purple-400 rounded w-full"></div>
      </div>
    </div>
  );
};

export default Placeholder;
