/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import React from "react";
import CardSwap, { Card } from "../../Components/Ui/CardSwap";
import { motion } from "framer-motion";
import MediaIcon from "@rsuite/icons/Media";
import ConversionIcon from "@rsuite/icons/Conversion";
import SendIcon from "@rsuite/icons/Send";
// Import Swiper styles

const AboutUs = () => {
  return (
    <motion.div
      className="min-h-screen relative gap-24 top-40 xl:-top-24  flex flex-col  xl:flex-row  items-center justify-between  text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Left side text */}
      <div className=" pl-10 sfm:pl-20   ">
        <h1 className=" text-2xl ssm:text-4xl smm:text-5xl xl:w-[400px] xxl:w-full xl:text-4xl xxxl:text-5xl font- leading-tight mb-4">
          {" "}
          𝕄𝕦𝕤𝕚𝕔𝕣𝕒𝕗𝕥𝕖𝕣𝕤 = 𝕐𝕠𝕦𝕣 𝕣𝕚𝕘𝕙𝕥 𝕔𝕙𝕠𝕚𝕔𝕖
        </h1>
        <p className="text-gray-400 text-sm w-[250px] ssm:text-lg ssm:w-[400px] smm:w-[600px] xl:w-[400px]  xxl:w-[600px] flex flex-col gap-2">
          Musicrafters is an accessories brand inspired by music and legendary
          artists. We create unique designs and print them on high-quality
          products — bringing the energy of music into everyday style.
          <span>
            Our pieces are style that resonates - feel the vibe, wear the music.
          </span>
        </p>
      </div>

      {/* Right side stacked cards */}
      <div className=" relative -top-72 ssm:-top-60 mmd:-top-80 left-40 smm:left-80 xl:-left-60 xl:-top-20  h-[500px] bg-blue-400">
        <div className="">
          <CardSwap
            cardDistance={60}
            verticalDistance={70}
            delay={5000}
            pauseOnHover={false}
          >
            <Card>
              <div className="flex flex-row gap-4 pl-4 p-2">
                <MediaIcon className=" relative top-2" />
                <h3 className="text-medium font-serif">Social Media</h3>
              </div>

              <div className="border-t-1 border-white">
                <img src="https://i.postimg.cc/1tT01dBC/musicig.png" alt="" />
              </div>
            </Card>

            <Card>
              <div className="flex flex-row gap-4 pl-4 p-2">
                <SendIcon className=" relative top-2" />
                <h3 className="text-medium font-serif">Delivery</h3>
              </div>
              <div className="border-t-1 border-white">
                <img
                  src="https://www.corpnet.com/wp-content/uploads/2019/12/Dropship-Concept-Illustration.jpg"
                  alt=""
                />
              </div>
            </Card>

            <Card>
              <div className="flex flex-row gap-4 pl-4 p-2">
                <ConversionIcon className=" relative top-2" />
                <h3 className="text-medium font-serif">Paypal Payment</h3>
              </div>
              <div className="border-t-1 border-white">
                <img
                  src="https://appsero.com/app/uploads/2021/03/What-Does-Pending-Mean-on-PayPal-payment-gateway.png"
                  alt=""
                />
              </div>
            </Card>
          </CardSwap>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutUs;
