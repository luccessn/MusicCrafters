/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import React from "react";
// import { homeProducts } from "../../Constants/Database/HomeProducts";
// import { HomeProduct } from "./HomeProduct";
import useFetchData from "../../HOC/useFetchData";
import MainGridProduct from "../Products/MainGridProduct";
import Puls from "../Loaderings/Puls";
import ErrorLoader from "../Loaderings/ErrorLoader";

export const HomeShowProducts = () => {
  const [data, error, isLoading] = useFetchData(
    // "http://localhost:3001/getcvImages"
    "http://localhost:3001/api/printful/get"
  );

  if (error) {
    return <ErrorLoader error={error} />;
  }

  return (
    <div className="flex justify-center ">
      <div className=" grid grid-cols-1 sm:grid-cols-2 mmd:grid-cols-3 gap-20 xl:grid-cols-4 xl:gap-10 xxl:gap-20 ">
        {isLoading
          ? // გაჩვენებს 8 loader-ს სანამ ჩაიტვირთება
            Array.from({ length: 8 }).map((_, index) => <Puls key={index} />)
          : data.map((item) => <MainGridProduct key={item._id} props={item} />)}
      </div>
    </div>
  );
};
