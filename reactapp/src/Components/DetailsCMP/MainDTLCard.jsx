/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import React from "react";
import useFetchData from "../../HOC/useFetchData";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import Puls from "../Loaderings/Puls";
import { SwiperCard } from "./SwiperCard";

const MainDTLCard = () => {
  //case ის
  const [data, error, isLoading] = useFetchData(
    "https://musicrafters.store/server/api/printful/get"
  );

  if (error) {
    return <h1>Erro: {error}</h1>;
  }
  return (
    <div>
      <div className=" w-[600px] ssmm:w-[450px]  ssm:w-[550px] sfm:w-[550px] smm:w-[650px] sm:w-[750px] md:w-[900px] mmd:w-[1000px] lg:w-[1100px]  xl:w-[1400px] xxl:w-[1500px] xxxl:w-[1800px] h-[500px] relative left-3 ">
        <Swiper
          spaceBetween={30}
          modules={[Autoplay]}
          className="mySwiper"
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            410: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 2,
            },
            800: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
        >
          {isLoading
            ? // გაჩვენებს 8 loader-ს სანამ ჩაიტვირთება
              Array.from({ length: 4 }).map((_, index) => <Puls key={index} />)
            : data.map((item) => (
                <SwiperSlide key={item._id}>
                  <div className="relative left-40  ssmm:left-0">
                    <SwiperCard key={item._id} props={item} />
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MainDTLCard;
