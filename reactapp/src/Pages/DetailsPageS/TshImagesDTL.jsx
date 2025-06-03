/* eslint-disable prettier/prettier */
import React from "react";
import useFetchData from "../../HOC/useFetchData";
import { useParams } from "react-router-dom";
import MainDTLCards from "../../Components/DetailsCMP/MainDTLCards";

const TshImagesDTL = () => {
  const { prID } = useParams();

  const [data, error, loading] = useFetchData(
    `http://localhost:3001/api/printful/get?id=${prID}`
  );

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      {loading && <h1>Loading .. </h1>}
      {/* <MainDTCards props={data} /> */}
      <MainDTLCards data={data} />
    </div>
  );
};

export default TshImagesDTL;
