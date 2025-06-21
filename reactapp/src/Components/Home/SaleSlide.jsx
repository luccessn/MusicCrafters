/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
const CAMPAIGN_START = new Date(Date.UTC(2025, 5, 21, 9, 0, 0));
const COUNTDOWN_DURATION_SECONDS = 24 * 60 * 60; // 24 საათი
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import { EffectCube, Autoplay } from "swiper/modules";
const newsDesign = [
  {
    id: 1,
    src: "https://i.postimg.cc/HskYJRSp/unisex-tri-blend-t-shirt-mauve-triblend-front-68419d66f3045.png",
  },
  {
    id: 2,
    src: "https://i.postimg.cc/tCp5FtPR/all-over-print-unisex-wide-leg-pants-white-front-68419f712f622.png",
  },
  {
    id: 3,
    src: "https://i.postimg.cc/yNk8SLKH/unisex-basic-softstyle-t-shirt-dark-heather-front-2-68485168a9407.png",
  },
];
export const SaleSlide = () => {
  const [showBanner, setShowBanner] = useState(false); // თავიდან false
  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_DURATION_SECONDS); // 24 საათი წამებში
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBanner(true); // 2 წამში აჩვენოს
    }, 2000);

    return () => clearTimeout(timer); // სუფთავება
  }, []);
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const endTime = new Date(
        CAMPAIGN_START.getTime() + COUNTDOWN_DURATION_SECONDS * 1000
      );
      const diffSeconds = Math.floor((endTime - now) / 1000);
      setTimeLeft(diffSeconds > 0 ? diffSeconds : 0);
    };

    updateCountdown(); // პირველად
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };
  return (
    <>
      {showBanner && (
        <div className="fixed inset-0 z-50 bg-black -top-10 ssm:-top-24 smm:top-0 bg-opacity-80 flex items-center justify-center overflow-auto p-4">
          {" "}
          <button
            onClick={() => setShowBanner(false)}
            className="absolute top-28 ssm:top-60 smm:top-40 mmd:top-20 right-1 ssm:right-5 mmd:right-20  xl:right-40 xxl:right-72 text-white text-4xl font-bold hover:text-purple-700 transition duration-200"
          >
            ×
          </button>
          <div>
            <div className=" w-[300px] h-[300px] ssm::w-[350px] ssm:h-[350px] sfm:w-[400px] sfm:h-[400px] smm:w-[500px] smm:h-[500px] mmd:w-[600px] mmd:h-[600px]">
              <Swiper
                effect={"cube"}
                grabCursor={true}
                cubeEffect={{
                  shadow: true,
                  slideShadows: true,
                  shadowOffset: 20,
                  shadowScale: 0.94,
                }}
                pagination={true}
                modules={[EffectCube, Autoplay]}
                className="mySwiper "
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                }}
              >
                {newsDesign.map((item) => (
                  <SwiperSlide key={item.id}>
                    <img src={item.src} alt="" />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="flex gap-2 pt-10  smm:p-10 text-sm sfm:text-3xl smm:text-4xl mmd:text-5xl font-mono text-purple-600 tracking-widest">
                {formatTime(timeLeft)
                  .split("")
                  .map((char, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded bg-black bg-opacity-80 shadow-md shadow-purple-500 ${
                        char === ":" ? "text-purple-300" : "text-purple-800"
                      }`}
                    >
                      {char}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
