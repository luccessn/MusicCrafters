/* eslint-disable prettier/prettier */
import React from "react";
import useFetchData from "../../HOC/useFetchData";
import MainGridProduct from "../../Components/Products/MainGridProduct";

const TshirtPR = () => {
  const [data, error, isLoading] = useFetchData(
    "http://localhost:3001/getPrintfulDesigns"
  );
  if (error) {
    return <h1>err:{error}</h1>;
  }

  return (
    <div className="flex justify-center  flex-col gap-2">
      <div className=" grid grid-cols-4 gap-x-44 gap-y-24">
        {isLoading && <h1>Loading...</h1>}
        {data.map((item) => (
          <MainGridProduct key={item.id} props={item} />
        ))}
      </div>
    </div>
  );
};

export default TshirtPR;
