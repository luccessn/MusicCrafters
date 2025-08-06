/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// import { Drawer, Button } from "rsuite";
import "rsuite/dist/rsuite.css";
import { Badge } from "rsuite";

import "rsuite/dist/rsuite-no-reset.min.css";
import { useAppContext } from "../../Context/AppContextReducer";
import { clearCart } from "../../Context/AppActionsCreator";
import { NavLink, useNavigate } from "react-router-dom";
import { routes } from "../../Constants/ConstRouts/routes";
import CartCard from "./CartCard";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { StarsBackground } from "../Ui/stars/stars-background";
const NavBarHR = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [Open, setIsOpen] = useState(false);
  // const [openWithHeader, setOpenWithHeader] = React.useState(false);
  const { state, dispatch } = useAppContext();
  const smMenu = [
    { title: "Home", path: routes.home },
    { title: "AboutUs", path: routes.aboutus },
  ];
  return (
    <div className="relative z-50">
      <nav className="flex items-center justify-between px-6 py-4 ">
        <motion.button
          onClick={() => setIsOpen(!Open)}
          className="transition-transform duration-200"
          initial={false}
          animate={{ rotate: Open ? 90 : 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {Open ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </motion.button>

        {/* Logo */}
        <NavLink
          to="/"
          className=" flex items-center  text-sm font-normal text-black"
        >
          <h1 className="text-xl left-1 ssm:text-3xl relative  ssm:left-3 mmd:left-5 font-bold whitespace-pre text-white hover:text-purple-700 transition-colors duration-300    ">
            𝓜𝓾𝓼𝓲𝓬 𝓒𝓻𝓪𝓯𝓽𝓮𝓻𝓼
          </h1>
        </NavLink>
        {/* Icons */}
        <div className="flex gap-4">
          <Badge content={state.cartItems.length}>
            <button onClick={onOpen}>
              <ShoppingCart className="text-white w-5 h-5 hover:scale-110 transition-transform duration-150" />
            </button>
          </Badge>
          <Drawer
            isOpen={isOpen}
            motionProps={{
              variants: {
                enter: {
                  opacity: 1,
                  x: 0,
                  duration: 0.3,
                },
                exit: {
                  x: 100,
                  opacity: 0,
                  duration: 0.3,
                },
              },
            }}
            onOpenChange={onOpenChange}
            size="md"
          >
            <DrawerContent className="bg-purple-950 rounded-sm">
              {(onClose) => {
                const handleCheckout = () => {
                  onClose(); // დახუროს Drawer
                  setTimeout(() => {
                    const total = state.cartItems
                      .reduce((acc, item) => {
                        const price = parseFloat(item.price.replace("$", ""));
                        return acc + price * item.quantity;
                      }, 0)
                      .toFixed(2);

                    navigate(routes.checkout, {
                      state: {
                        total,
                      },
                    });
                  }, 300); // დაელოდოს Drawer-ის დახურვის ანიმაციას
                };

                return (
                  <>
                    <DrawerHeader className="flex flex-col gap-1 bg-zinc-800 text-white">
                      <div className="flex flex-col gap-5">
                        <h1 className="text-3xl">Your Cart</h1>
                        <div className="flex flex-row justify-between font-serif">
                          <h1 className="text-medium">Product</h1>
                          <h1 className="text-medium">Total</h1>
                        </div>
                      </div>
                      <StarsBackground />
                    </DrawerHeader>

                    <DrawerBody>
                      <div className="flex flex-col gap-5">
                        {state.cartItems.map((item) => (
                          <CartCard key={item.id} props={item} />
                        ))}
                      </div>
                    </DrawerBody>

                    <DrawerFooter className="bg-zinc-800 flex flex-col gap-3">
                      <div className="w-full text-white text-xl font-mono flex justify-between px-2">
                        <span>Estimated total :</span>
                        <span>
                          {state.cartItems
                            .reduce((acc, item) => {
                              const price = parseFloat(
                                item.price.replace("$", "")
                              );
                              return acc + price * item.quantity;
                            }, 0)
                            .toFixed(2)}{" "}
                          $
                        </span>
                      </div>

                      <button
                        onClick={handleCheckout}
                        className="cursor-pointer relative bg-white/10 py-2 rounded-full min-w-[8.5rem] min-h-[2.92rem] group max-w-full flex items-center justify-start hover:bg-purple-950 transition-all duration-[0.8s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] shadow-[inset_1px_2px_5px_#00000080]"
                      >
                        <div className="absolute flex px-1 py-0.5 justify-start items-center inset-0">
                          <div className="w-[0%] group-hover:w-full transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)]" />
                          <div className="rounded-full shrink-0 flex justify-center items-center shadow-[inset_1px_-1px_3px_0_black] h-full aspect-square bg-purple-900 transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] group-hover:bg-black">
                            <div className="size-[0.8rem] text-black group-hover:text-white group-hover:-rotate-45 transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 16 16"
                                height="100%"
                                width="100%"
                              >
                                <path
                                  fill="currentColor"
                                  d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="pl-[3.4rem] pr-[1.1rem] group-hover:pl-[1.1rem] group-hover:pr-[3.4rem] transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] group-hover:text-black text-white text-medium tracking-widest">
                          𝐂𝐡𝐞𝐜𝐤 𝐎𝐮𝐭
                        </div>
                      </button>

                      {/* Footer Buttons */}
                      <div className="flex w-full justify-end gap-3">
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Close
                        </Button>
                        <Button
                          color="danger"
                          onPress={() => dispatch(clearCart())}
                        >
                          Clear All
                        </Button>
                      </div>
                    </DrawerFooter>
                  </>
                );
              }}
            </DrawerContent>
          </Drawer>
        </div>
      </nav>

      <AnimatePresence>
        {Open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.aside
              className="fixed left-0 top-0 h-full w-64  p-6 z-50 shadow-lg"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="flex justify-end">
                <button onClick={() => setIsOpen(false)}>
                  <X className="text-white w-6 h-6" />
                </button>
              </div>
              <nav className="mt-8 flex flex-col gap-6 text-lg text-gray-300 font-mono">
                {smMenu.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-purple-700 hover:text-white transition-colors duration-200 "
                        : "text-white hover:text-purple-500 transition-colors duration-250 "
                    }
                  >
                    {item.title}
                  </NavLink>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavBarHR;
