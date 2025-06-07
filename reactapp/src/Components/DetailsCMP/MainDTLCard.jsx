/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import React from "react";
import useFetchData from "../../HOC/useFetchData";
import MainGridProduct from "../Products/MainGridProduct";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import Puls from "../Loaderings/Puls";

const MainDTLCard = () => {
  //case ის
  const [data, error, isLoading] = useFetchData(
    "http://localhost:3001/api/printful/get"
  );
  // //hood ის
  // const [hddata, hderror, hdloading] = useFetchData(
  //   "http://localhost:3001/api/printful/get"
  // );
  // //tshirt ის
  // const [thdata, therror, thloading] = useFetchData(
  //   "http://localhost:3001/api/printful/get"
  // );
  if (error) {
    return <h1>Erro: {error}</h1>;
  }
  return (
    <div>
      <div className=" w-[1200px] xxl:w-[1500px] xxxl:w-[1800px] h-[500px] relative left-3 ">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          // breakpoints={{
          //   0: {
          //     slidesPerView: 1,
          //   },
          //   640: {
          //     slidesPerView: 2,
          //   },
          //   1024: {
          //     slidesPerView: 3,
          //   },
          //   1280: {
          //     slidesPerView: 4,
          //   },
          //   1536: {
          //     slidesPerView: 5,
          //   },
          // }}
        >
          {isLoading
            ? // გაჩვენებს 8 loader-ს სანამ ჩაიტვირთება
              Array.from({ length: 4 }).map((_, index) => <Puls key={index} />)
            : data.map((item) => (
                <SwiperSlide key={item._id}>
                  <MainGridProduct key={item._id} props={item} />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MainDTLCard;
//  {props.type === "tshirt" ? (
//       thloading ? (
//         <h1>Loading...</h1>
//       ) : therror ? (
//         <h1 className="text-red-500">{therror}</h1> // Display error for Tshirt
//       ) : (
//         <div className="w-[1800px] h-[500px] relative left-24  ">
//           <Swiper
//             slidesPerView={4}
//             spaceBetween={10}
//             pagination={{
//               clickable: true,
//             }}
//             modules={[Pagination, Autoplay]}
//             className="mySwiper"
//             autoplay={{
//               delay: 1500,
//               disableOnInteraction: false,
//             }}
//           >
//             {thdata.map((item) => (
//               <SwiperSlide key={item.id}>
//                 <MainGridProduct key={item.id} props={item} />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       )
//     ) : props.type === "hood" ? (
//       hdloading ? (
//         <h1>Loading...</h1>
//       ) : hderror ? (
//         <h1 className="text-red-500">{hderror}</h1> // Display error for Hood
//       ) : (
//         <div className="w-[1800px] h-[500px] relative left-24 ">
//           <Swiper
//             slidesPerView={4}
//             spaceBetween={30}
//             pagination={{
//               clickable: true,
//             }}
//             modules={[Pagination, Autoplay]}
//             className="mySwiper"
//             autoplay={{
//               delay: 1500,
//               disableOnInteraction: false,
//             }}
//           >
//             {hddata.map((item) => (
//               <SwiperSlide key={item.id}>
//                 <MainGridProduct key={item.id} props={item} />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       )
//     ) : props.type === "case" ? (
//       csloading ? (
//         <h1>Loading...</h1>
//       ) : cserror ? (
//         <h1 className="text-red-500">{cserror}</h1> // Display error for Case
//       ) : (
//         <div className="w-[1800px] h-[500px] relative left-24 ">
//           <Swiper
//             slidesPerView={4}
//             spaceBetween={30}
//             pagination={{
//               clickable: true,
//             }}
//             modules={[Pagination, Autoplay]}
//             className="mySwiper"
//             autoplay={{
//               delay: 1500,
//               disableOnInteraction: false,
//             }}
//           >
//             {csdata.map((item) => (
//               <SwiperSlide key={item.id}>
//                 <MainGridProduct key={item.id} props={item} />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       )
//     ) : null}
