/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import React from "react";
// import { useAppContext } from "../../Context/AppContextReducer";
import "swiper/css";
import { motion } from "framer-motion";

import musicWeb from "../../Images/musicwebMARS.svg";
import { HomeShowProducts } from "../../Components/Home/HomeShowProducts";
// import Astronaut from "../../Components/Home/LoadersHM/Astronaut";
import Ghost from "../../Components/Home/LoadersHM/Ghost";
import Flamer from "../../Components/Home/LoadersHM/Flamer";
import { useAppContext } from "../../Context/AppContextReducer";

// import FuzzyText from "../../Components/Ui/textFZ/FuzzyText";
// import Spline from "@splinetool/react-spline";
export const Home = () => {
  // const { state } = useAppContext();
  //cart test
  const { state } = useAppContext();
  console.log(state);
  return (
    <motion.div
      className="text-5xl p-6 text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex flex-col  ">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          <div className="flex flex-row gap-20">
            <div className="relative top-20">
              {/* <FuzzyText baseIntensity={0.2} hoverIntensity={2} enableHover={2}>
              ffz
            </FuzzyText> */}
              <Ghost />
            </div>
            <div className="w-full flex justify-center relative -top-20 ">
              <img
                src={musicWeb}
                alt="music visual"
                className="w-[900px] max-w-full rounded-full contrast-125 hue-rotate-[-35deg] saturate-50"
              />
            </div>
            <div className=" relative top-96">
              <Flamer />
            </div>
          </div>
          {/* <Spline scene="https://prod.spline.design/FYO052hVaX2k2Rm3/scene.splinecode" /> */}
        </div>
        <div className=" relative -top-40   ">
          <HomeShowProducts />
        </div>
        {/* <h1 className="text-white bg-red-400 mt-6 text-xl">
          {state.user ? state.user.userName : "alo"}
        </h1>
        <div className="h-full text-white mt-4">Home</div> */}
        <footer className="w-full bg-red-500">
          <h1>ADAD</h1>
        </footer>
      </div>
    </motion.div>
  );
};
