/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unknown-property */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import React, { useEffect } from "react";
// import { useAppContext } from "../../Context/AppContextReducer";
import { motion } from "framer-motion";

import musicWeb from "../../Images/musicwebMARS.svg";
import { HomeShowProducts } from "../../Components/Home/HomeShowProducts";
import Ghost from "../../Components/Home/LoadersHM/Ghost";
import Flamer from "../../Components/Home/LoadersHM/Flamer";

import Aurora from "../../Components/Ui/Aura";
import { SaleSlide } from "../../Components/Home/SaleSlide";
// import { SaleSlide } from "../../Components/Home/SaleSlide";
const BackgroundDesign = [Ghost, Ghost, Flamer, Flamer, Ghost, Flamer];
export const Home = () => {
  // const { state } = useAppContext();
  //cart test
  const goInsta = () => {
    window.open(
      "https://www.instagram.com/musicrafters/",
      "_blank",
      "noopener,noreferrer"
    );
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("src", "https://www.instagram.com/embed.js");
    script.setAttribute("async", "");
    document.body.appendChild(script);

    // ორჯერ გამოძახება შეიძლება საჭირო იყოს React-ში
    setTimeout(() => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    }, 1000);
  }, []);

  return (
    <motion.div
      className="min-h-screen flex flex-col justify-between text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <SaleSlide />
      <div className="flex flex-col ">
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            <div className="flex flex-row gap-20">
              <div className="relative top-20 -z-10 opacity-40 mmd:opacity-100">
                <Ghost />
              </div>
              <div className="w-full flex justify-center relative -top-20 ">
                <img
                  src={musicWeb}
                  alt="music visual"
                  className="hidden  mmd:block w-[900px] max-w-full rounded-full contrast-125 hue-rotate-[-35deg] saturate-50 z-10"
                />
              </div>
              <div className=" relative top-96 -z-10 opacity-40 mmd:opacity-100">
                <Flamer />
              </div>
            </div>
            {/* <Spline scene="https://prod.spline.design/FYO052hVaX2k2Rm3/scene.splinecode" /> */}
          </div>

          <div className="relative top-0 mmd:-top-40 z-10">
            {/* Background elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              {BackgroundDesign.map((Component, index) => {
                // წინასწარ განსაზღვრული პოზიციები (მაგალითად)
                const positions = [
                  { top: "40%", left: "20%" },
                  { top: "35%", right: "0%" },
                  { top: "80%", left: "0%" },
                  { top: "95%", right: "5%" },
                  { top: "100%", right: "60%" },
                  { top: "55%", right: "35%" },
                ];
                const style = {
                  position: "absolute",
                  ...positions[index % positions.length],
                  opacity: 0.5,
                };

                return (
                  <div key={index} style={style}>
                    <Component />
                  </div>
                );
              })}
            </div>

            {/* Foreground products */}
            <div className="relative z-10">
              <HomeShowProducts />
            </div>
          </div>
        </div>

        <footer className="w-full">
          <div className="z-10 p-4 ssm:pl-10 relative top-28  flex flex-col gap-2 ">
            <h1 className="text-white text-medium ssm:text-xl sfm:text-2xl md:text-3xl mmd:text-4xl">
              𝓜𝓾𝓼𝓲𝓬 𝓒𝓻𝓪𝓯𝓽𝓮𝓻𝓼
            </h1>
            <div className="hidden smm:block">
              <p className="text-gray-300 font-mono w-3/4  smm:w-full text-[10px] ssm:text-[12px] smf:text-sm md:text-medium flex flex-col mmd:flex-row gap-2">
                Here you can buy printed T-shirts and accessories of your
                favorite singers.{" "}
                <span className="text-yellow-200"> Payment via PayPal.</span>
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <div className="group relative  flex flex-row gap-5">
                <p className=" text-[10px] ssm:text-[12px] smf:text-sm md:text-medium text-gray-300 font-mono">
                  Visit Our Instagram For more NEWS
                </p>
                <button className="focus:outline-none" onClick={goInsta}>
                  <svg
                    viewBox="0 0 16 16"
                    className="bi w-4 h-4 ssm:h-5 ssm:w-5 smf:h-6 smf:w-6  bi-instagram transform transition-transform duration-300 hover:scale-125 hover:text-purple-500"
                    fill="currentColor"
                    // height="30"
                    // width="30"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"></path>
                  </svg>
                </button>
                {/* <span className="absolute -top-14 left-80 transform -translate-x-1/2 z-20 px-4 py-2 text-sm font-bold text-white bg-gray-900 rounded-lg shadow-lg transition-transform duration-300 ease-in-out scale-0 group-hover:scale-100">
                  Instagram
                </span> */}
              </div>
              <p className="-translate-x-10 translate-y-10 text-[6px] ssm:text-sm font-serif text-black">
                @By SSENY
              </p>
            </div>
          </div>

          <div className="rotate-[3.142rad] -z-10">
            <Aurora
              colorStops={["#800080", "#800080", "#7C3030"]}
              blend={0.5}
              amplitude={1.0}
              speed={0.5}
            />
          </div>
        </footer>
      </div>
    </motion.div>
  );
};
