/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
"use client";
// import Link from "next/link";
import { useNavigate } from "react-router-dom";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { cn } from "../../Lib/utils";

import { useAppContext } from "../../Context/AppContextReducer";
("use client");

// Default image for fallback

// Create context for sidebar state
const SidebarContext = createContext(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}) => {
  const [openState, setOpenState] = useState(false);
  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({ children, open, setOpen, animate }) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...props} />
    </>
  );
};

export const DesktopSidebar = ({ className, children, ...props }) => {
  const { open, setOpen, animate } = useSidebar();

  return (
    <>
      <motion.div
        className={cn(
          "h-full px-4 py-4 hidden md:flex md:flex-col  dark:bg-black w-[300px] shrink-0",
          className
        )}
        animate={{
          width: animate ? (open ? "300px" : "60px") : "300px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({ className, children, ...props }) => {
  const { open, setOpen } = useSidebar();

  return (
    <>
      <div
        className={cn(
          "h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between  dark:bg-black w-full"
        )}
        {...props}
      >
        <div className="flex justify-end z-20 w-full">
          <IconMenu2
            className="text-neutral-800 dark:text-neutral-200 cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-white dark:bg-black p-10 z-[100] flex flex-col justify-between",
                className
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200 cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <IconX />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link = {
    href: "/",
    icon: null,
    label: "Link",
    image: null,
    dispatch: null,
    contents: null,
  },
  className,
  ...props
}) => {
  const { dispatch } = useAppContext();
  const { open, animate } = useSidebar();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();

    // Handle dispatch actions
    if (link.dispatch) {
      dispatch(link.dispatch);
    }

    // Handle navigation if no sub-items or return
    if (link.href && link.href !== "#" && !link.contents && !link.return) {
      navigate(link.href);
    }

    // Toggle expansion if the link has contents or return
    if (link.contents || link.return) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        onClick={handleClick}
        className={cn(
          "flex items-center justify-between gap-2 group/sidebar py-2 cursor-pointer",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          {link.icon ? (
            link.icon
          ) : link.image ? (
            <image
              src={link.image}
              alt={link.label || "Navigation item"}
              width={24}
              height={24}
              className="rounded-full"
            />
          ) : (
            <div className="w-6 h-6 bg-neutral-300 dark:bg-neutral-700 rounded-full flex-shrink-0" />
          )}
          <motion.span
            animate={{
              display: animate
                ? open
                  ? "inline-block"
                  : "none"
                : "inline-block",
              opacity: animate ? (open ? 1 : 0) : 1,
            }}
            className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
          >
            {link.label || "Link"}
          </motion.span>
        </div>

        {/* Accordion arrow icon */}
        {link.contents && (
          <motion.div
            animate={{
              rotate: isExpanded ? 90 : 0,
              opacity: animate ? (open ? 1 : 0) : 1,
              display: animate
                ? open
                  ? "inline-block"
                  : "none"
                : "inline-block",
            }}
            transition={{ duration: 0.2 }}
            className="text-neutral-500 dark:text-neutral-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </motion.div>
        )}
      </div>

      {/* Accordion content */}
      {link.contents && (
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
          style={{
            paddingLeft: animate ? (open ? "2.5rem" : "0") : "2.5rem",
          }}
        >
          <div className="py-1">
            {link.contents.map((subItem, index) => (
              <div
                key={index}
                className="text-sm text-neutral-600 dark:text-neutral-400 py-1 relative left-0 hover:left-2 hover:text-neutral-800 duration-300 dark:hover:text-neutral-200 cursor-pointer flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  if (subItem.href && subItem.href !== "#") {
                    navigate(subItem.href);
                  }
                }}
              >
                <span className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-600"></span>
                <span>{subItem.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 👇 ADD THIS BELOW 👇 */}
      {link.return && (
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
          style={{
            paddingLeft: animate ? (open ? "2.5rem" : "0") : "2.5rem",
          }}
        >
          <div className="py-1">{link.return}</div>
        </motion.div>
      )}
    </div>
  );
};
