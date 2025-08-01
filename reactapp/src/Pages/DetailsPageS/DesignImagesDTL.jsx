/* eslint-disable prettier/prettier */
import React from "react";
import useFetchData from "../../HOC/useFetchData";
import { useParams } from "react-router-dom";
import MainDTLCards from "../../Components/DetailsCMP/MainDTLCards";
import Placeholder from "../../Components/Loaderings/Placeholder";
const DesignImagesDTL = () => {
  const { prID } = useParams();

  const [data, error, loading] = useFetchData(
    `/server/api/printful/get?id=${prID}`
  );

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      <div>
        {loading && <Placeholder />}
        {/* <MainDTCards props={data} /> */}
        <MainDTLCards data={data} />
      </div>
    </>
  );
};

export default DesignImagesDTL;
// `https://ferraritifo.live/server/api/printful/get?id=${prID}`
