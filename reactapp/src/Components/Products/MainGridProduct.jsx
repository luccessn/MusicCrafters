/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorLoader from "../Loaderings/ErrorLoader";

const MainGridProduct = ({ props }) => {
  // თუ მაგალითად იმიჯი არ არსებობს, ან სხვა პარამეტრი არის პრობლემა, ეს იქნება error
  const hasError = !props?.price || !props?.name; // errors Types

  const [image, setImage] = useState(props.images?.img1);
  const handleMouseEnter = () => {
    if (props.images?.img2) {
      setImage(props.images?.img2); // შეცვლის ფოტოს img2-ზე
    } else {
      setImage(props.images?.img1); // დაბრუნდება img1-ზე
    }
  };

  const handleMouseLeave = () => {
    setImage(props.images?.img1); // დაბრუნდება img1-ზე
  };
  // Naviget
  const navigate = useNavigate();
  const goDTL = () => {
    navigate(`/designDetail/${props.printfulProductId}`);
    // if (props.member === "cover") {
    //   navigate(`/cvdetail/${props.id}`);
    // } else if (props.type === "tshirt") {
    //   navigate(`/tshirtdetail/${props.printfulProductId}`);
    // } else if (props.type === "case") {
    //   navigate(`/casedetail/${props.id}`);
    // } else if (props.type === "hood") {
    //   navigate(`/hooddetail/${props.id}`);
    // }
    window.scrollTo(0, 0);
  };
  if (hasError) {
    return <ErrorLoader error={"Product data is missing or corrupted"} />;
  }
  return (
    <>
      {props.images?.img1 ? (
        <div
          onClick={goDTL}
          className=" w-[260px]   h-[320px] mt-10 mmd:m-0  ssmm:w-[300px] ssmm:h-[360px] ssm:w-[220px] ssm:h-[290px] sfm:w-[260px] sfm:h-[330px] smm:w-[280px] smm:h-[350px]  sm:w-[340px] sm:h-[400px] xxxl:w-[380px] xxxl:h-[500px] flex flex-col rounded-xl relative shadow hover:shadow-md transition"
        >
          {/* ssmm:w-[190px] ssmm:h-[260px]  */}
          <div className="w-full h-[380px] overflow-hidden rounded-sm">
            <img
              src={image}
              alt=""
              className="w-full h-full object-fill transition-transform duration-1000 ease-in-out transform hover:scale-125"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </div>
          {/* {props.sale ? (
            <div className="absolute overflow-hidden  w-[130px] h-[200px]  flex items-center justify-center">
              <div className="absolute w-[150%] h-10 rotate-[-45deg] -translate-y-3 bg-gradient-to-r from-[#770737] via-[#800080] to-[#953553] text-white font-mono text-2xl uppercase shadow-md flex items-center justify-center">
                Sale {props.sale}
              </div>
              <div className="absolute w-[10px] h-[10px] bottom-0 left-0 -z-10 shadow-[140px_-140px_0_0_#cc3f47] bg-gradient-to-r from-[#770737] via-[#770737] to-[#770737]" />
            </div>
          ) : (
            ""
          )} */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-center  ">
              <div className="flex flex-col gap-2  ">
                <div className="flex flex-col gap-2 mt-4 items-center">
                  {/* პროდუქტის სახელი */}
                  <div className="text-center w-full px-2">
                    <span className="text-sm ssm:w-full sfm:text-base smm:text-lg text-gray-100 font-semibold break-words leading-snug block">
                      {props.name}
                    </span>
                  </div>

                  {/* ფასი და stock */}
                  <div className="flex justify-center items-center gap-10">
                    <span className="text-green-400 font-bold text-sm sfm:text-medium  smm:text-lg">
                      {props.price ? props.price : props.maxPrice} $
                    </span>
                    <span className="text-purple-400 text-sm sfm:text-medium smm:text-lg font-mono">
                      Stock: {props.stock}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MainGridProduct;
