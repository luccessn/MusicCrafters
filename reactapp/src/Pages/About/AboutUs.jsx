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
