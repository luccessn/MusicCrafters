/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import React from "react";
import CardSwap, { Card } from "../../Components/Ui/CardSwap";
import { motion } from "framer-motion";

// Import Swiper styles

const AboutUs = () => {
  return (
    <motion.div
      className="min-h-screen relative -top-24  flex flex-col md:flex-row  items-center justify-between  text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Left side text */}
      <div className="   px-40 ">
        <h1 className="text-5xl font-bold leading-tight mb-4">
          Card stacks have never <br /> looked so good
        </h1>
        <p className="text-gray-400 text-lg">Just look at it go!</p>
      </div>

      {/* Right side stacked cards */}
      <div className=" relative -top-20 right-60 h-[500px] bg-blue-400">
        <div className="">
          <CardSwap
            cardDistance={60}
            verticalDistance={70}
            delay={5000}
            pauseOnHover={false}
          >
            <Card>
              <h3>Card 1</h3>

              <img src="https://i.postimg.cc/1tT01dBC/musicig.png" alt="" />
            </Card>

            <Card>
              <h3>Card 2</h3>
              <img
                src="https://www.corpnet.com/wp-content/uploads/2019/12/Dropship-Concept-Illustration.jpg"
                alt=""
              />
            </Card>

            <Card>
              <h3>Card 3</h3>

              <p>Your content here</p>
            </Card>
          </CardSwap>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutUs;
