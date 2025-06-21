/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import React, { useEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { motion } from "framer-motion";
import MainDTLCard from "./MainDTLCard";
import { useAppContext } from "../../Context/AppContextReducer";
import {
  addToCart,
  CounterDecrement,
  CounterIncriment,
  CounterReset,
} from "../../Context/AppActionsCreator";
import SuccessToaster from "../Products/Toaster/SuccessToaster";
import ErrorLoader from "../Loaderings/ErrorLoader";
import { useNavigate } from "react-router-dom";
import { routes } from "../../Constants/ConstRouts/routes";
const MainDTLCards = ({ data }) => {
  const [imgsChange, setImgsChange] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  //

  const { state, dispatch } = useAppContext();
  //error
  const hasError =
    !data?.variants ||
    !Array.isArray(data.variants) ||
    data.variants.length === 0;

  // დაყენება images[0] სურათზე
  useEffect(() => {
    if (data && data.images?.img1) {
      setImgsChange(data.images.img1);
    }
  }, [data]);
  // ზომების გამოტანა უნიკალურად variants-დან
  useEffect(() => {
    if (data && data.variants) {
      const uniqueSizes = Array.from(new Set(data.variants.map((v) => v.size)));

      const uniqueColorsMap = new Map();
      data.variants.forEach((v) => {
        if (!uniqueColorsMap.has(v.color_code)) {
          uniqueColorsMap.set(v.color_code, {
            color_code: v.color_code,
            color: v.color,
          });
        }
      });

      const uniqueColors = Array.from(uniqueColorsMap.values());
      setAvailableSizes(uniqueSizes);
      setAvailableColors(uniqueColors);

      if (uniqueColors.length > 0) setSelectedColor(uniqueColors[0]);
      if (uniqueSizes.length > 0) setSelectedSize(uniqueSizes[0]);
    }
  }, [data]);

  const getPriceBySize = (size) => {
    const variant = data.variants.find((v) => v.size === size);
    return variant ? variant.retail_price : parseFloat(data.price);
  };
  const getVariantBySizeAndColor = (size, color_code) => {
    return data.variants.find(
      (v) => v.size === size && v.color_code === color_code
    );
  };
  // const AddToCart = () => {
  //   if (!selectedSize) return alert("აირჩიე ზომა!");

  //   const price = getPriceBySize(selectedSize); //  .toFixed(2)
  //   const itemToAdd = {
  //     id: `${data._id}-${selectedSize}-${selectedColor?.id}`,
  //     variantId: selectedColor?.id,
  //     name: data.name,
  //     image: data.images?.img1,
  //     price, // ახლა price არის string ტიპის
  //     color: selectedColor?.color,
  //     size: selectedSize,
  //     quantity: state.counter,
  //   };
  //   dispatch(addToCart(itemToAdd));
  // };
  // id: `${data._id}-${selectedSize}-${selectedColor?.id}`,
  const [showToaster, setShowToaster] = useState(false);
  const AddToCart = () => {
    if (!selectedSize || !selectedColor) {
      return alert("აირჩიე ზომა და ფერი!");
    }

    const variant = getVariantBySizeAndColor(
      selectedSize,
      selectedColor.color_code
    );
    if (!variant) return alert("ვარიანტი ვერ მოიძებნა");
    const itemToAdd = {
      id: `${data._id}-${selectedSize}-${selectedColor.color_code}`,
      sync_variant_id: variant.sync_variant_id, // ← სწორი ველი
      variantId: variant.variant_id,
      printfulProductId: data.printfulProductId,
      name: data.name,
      image: data.images?.img1,
      price: variant.retail_price,
      color: selectedColor.color,
      size: selectedSize,
      quantity: state.counter,
      stock: data.stock,
    };
    dispatch(addToCart(itemToAdd));
    // ტოსტერი გამოჩნდეს
    setShowToaster(true);
    setTimeout(() => setShowToaster(false), 3000);
  };

  useEffect(() => {
    dispatch(CounterReset());
  }, [data]);
  const navigate = useNavigate();
  return (
    <motion.div
      className="text-5xl p-6 text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="text-5xl p-6 text-white flex  flex-col gap-20 items-center ">
        <div className="text-white p-6   items-center text-5xl">
          <div className="flex flex-col   mmd:flex-row gap-14">
            {/* სურათების Swiper */}
            <div className="flex flex-row p-10 ssmm:p-0 gap-5 ssmm:gap-14">
              <div className="flex flex-col gap-5 w-[150px] sm:w-[200px] h-[600px] mmd:h-[700px]">
                <Swiper
                  navigation={true}
                  pagination={true}
                  spaceBetween={50}
                  slidesPerView={3}
                  direction={"vertical"}
                  modules={[Navigation, Pagination, Autoplay]}
                  autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                  }}
                >
                  {Object.values(data.images || {}).map((img, index) => (
                    <SwiperSlide key={index}>
                      <div className="w-full h-[150px] sm:h-[200px] relative">
                        {isLoading && index === 0 && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="loader border-4 border-purple-800 border-t-transparent rounded-full w-10 h-10 animate-spin"></span>
                          </div>
                        )}
                        <img
                          src={img}
                          alt=""
                          className={`w-full h-[150px] sm:h-[200px] object-cover rounded cursor-pointer ${
                            isLoading && index === 0 ? "invisible" : "visible"
                          }`}
                          onClick={() => setImgsChange(img)}
                          onLoad={() => index === 0 && setIsLoading(false)}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* მთავარი დიდი სურათი */}
              {imgsChange && (
                <div className="relative">
                  <Zoom>
                    <img
                      src={imgsChange}
                      alt=""
                      className=" w-[300px] ssmm:w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] object-cover rounded-lg cursor-zoom-in"
                    />
                  </Zoom>
                  {/* {data.sale && (
                  <div className="absolute overflow-hidden w-[150px] h-[150px] flex items-center justify-center top-0 left-0 -z-10">
                    <div className="absolute w-[150%] h-10 rotate-[-45deg] text-2xl -translate-y-5 bg-gradient-to-r from-[#770737] via-[#800080] to-[#953553] text-white font-semibold uppercase tracking-wider shadow-md flex items-center justify-center">
                      Sale {data.sale}
                    </div>
                    <div className="absolute w-[10px] h-[10px] bottom-0 left-0 -z-10 shadow-[140px_-140px_0_0_#cc3f47] bg-gradient-to-r from-[#770737] via-[#770737] to-[#770737]" />
                  </div>
                )} */}
                </div>
              )}
            </div>
            {/* მარჯვენა მხარე: ინფორმაცია, ფასი, ზომები */}
            <div className="  p-10 ssmm:p-0  mmd:top-0  w-[400px] flex flex-col gap-8 font-serif">
              <h1 className="text-5xl">{data.name}</h1>

              <div className="flex flex-row gap-4 items-center">
                <h1 className="text-3xl font-semibold text-green-500">
                  {selectedSize
                    ? `${state.counter * getPriceBySize(selectedSize)} $`
                    : `${data.price} $`}
                </h1>
                {/* {data.orgprice && (
                  <h1 className="text-2xl line-through font-bold text-red-600">
                    {data.orgprice}
                  </h1>
                )} */}
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl">Stock : {data.stock}</h1>
                <p className="text-medium text-zinc-400 pl-2">
                  This design is limited... Take a chance and become one of
                  their owners.
                </p>
              </div>
              {hasError ? (
                <ErrorLoader error="Product data is missing or corrupted" />
              ) : (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-xl">
                      Color: {selectedColor ? selectedColor.color : "None"}
                    </h1>
                    <div className="flex flex-row gap-5">
                      {availableColors.map((colorObj, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedColor(colorObj)}
                          style={{
                            width: "30px",
                            height: "30px",
                            backgroundColor: colorObj.color_code,
                            border:
                              selectedColor?.color_code === colorObj.color_code
                                ? "2px solid white"
                                : "1px solid #999",
                            outline: "none",
                            cursor: "pointer",
                          }}
                          className="rounded"
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h1 className="text-gray-300 text-xl">Choose your size:</h1>
                    <div className="grid grid-cols-4 gap-4">
                      {availableSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`text-medium w-20 h-10 rounded ${
                            selectedSize === size
                              ? "bg-gray-200 text-black"
                              : "bg-black text-white border border-gray-500"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <h1 className="text-xl">Quantity</h1>
                    <div className="text-xl flex flex-row items-center gap-3 relative left-10">
                      <button
                        onClick={() => dispatch(CounterDecrement(1))}
                        className={`px-3 py-1 rounded ${
                          state.counter === 1 ? "text-gray-600" : "text-white"
                        }`}
                      >
                        -
                      </button>
                      <h1>{state.counter}</h1>
                      <button
                        onClick={() => {
                          if (state.counter < data.stock)
                            dispatch(CounterIncriment(1));
                        }}
                        className={`px-3 py-1 rounded ${
                          state.counter >= data.stock
                            ? "text-gray-600 cursor-not-allowed"
                            : "text-white"
                        }`}
                        disabled={state.counter >= data.stock}
                      >
                        +
                      </button>
                    </div>

                    <div className="flex flex-col gap-10 items-center justify-between mt-6">
                      <button
                        onClick={() => {
                          AddToCart();
                          navigate(routes.checkout);
                        }}
                        disabled={data.stock === 0}
                        className={`transition px-6 py-3 w-full rounded-lg text-white text-xl ${
                          data.stock === 0
                            ? "bg-gray-500 opacity-50 cursor-not-allowed"
                            : "bg-rose-800 hover:bg-rose-950"
                        }`}
                      >
                        {data.stock === 0 ? "Sold Out" : "Pay Now"}
                      </button>
                      <button
                        onClick={AddToCart}
                        disabled={data.stock === 0}
                        className={`transition px-6 py-3 w-full rounded-lg text-white text-xl ${
                          data.stock === 0
                            ? "bg-gray-500 opacity-50 cursor-not-allowed"
                            : "bg-purple-700 hover:bg-purple-800"
                        }`}
                      >
                        {data.stock === 0 ? "Sold Out" : "Add to Cart"}
                      </button>

                      <div>
                        <SuccessToaster visible={showToaster} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <MainDTLCard props={data} />
        </div>
      </div>
    </motion.div>
  );
};

export default MainDTLCards;
