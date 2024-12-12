import { useState, useEffect } from "react";

import dhvsuLogo from "@/assets/icons/dhvsu-logo-v2.svg";
import FloatingNav from "@/components/FloatingNav";

import { Outlet } from "react-router-dom";

import dhvsuMain from "@/assets/images/dhvsu-main-image.jpg";

import dhvsuMainImage1 from "@/assets/images/dhvsu-gradients/dhvsu-main-image-1.jpg";
import dhvsuMainImage2 from "@/assets/images/dhvsu-gradients/dhvsu-main-image-2.jpg";
import dhvsuMainImage3 from "@/assets/images/dhvsu-gradients/dhvsu-main-image-3.jpg";
import dhvsuMainImage4 from "@/assets/images/dhvsu-gradients/dhvsu-main-image-4.jpg";
import dhvsuMainImage5 from "@/assets/images/dhvsu-gradients/dhvsu-main-image-5.jpg";

import { motion, AnimatePresence } from "framer-motion";

const dhvsuMainImages = [
  dhvsuMain,
  dhvsuMainImage1,
  dhvsuMainImage2,
  dhvsuMainImage3,
  dhvsuMainImage4,
  dhvsuMainImage5,
];

export default function Layout() {
  const [counter, setCounter] = useState(0);

  const handleNext = () => {
    setCounter((count) => (count >= 5 ? 0 : count + 1));
  };

  useEffect(() => {
    let interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  console.log(counter);

  return (
    <>
      <div className="relative h-screen items-center justify-center md:flex lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden">
        <section className="relative hidden h-full w-full items- bg-gradient-to-br from-brand-500 animated-background via-brand to-brand-300 lg:flex flex-col p-10">
          <AnimatePresence>
            <motion.img
              key={counter}
              src={dhvsuMainImages[counter]}
              className="absolute inset-0 h-screen object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
            />
          </AnimatePresence>

          <div className="relative z-20 flex items-center text-lg font-meidum gap-4">
            <img
              src={dhvsuLogo}
              alt="logo"
              width={64}
              height={64}
              className="h-auto"
            />
            <h4 className="h4 text-white font-bold shadow-drop-1">
              Don Honorio Ventura State University{" "}
            </h4>
          </div>
        </section>

        <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0 relative overflow-hidden ">
          <div className="mb-16 lg:hidden">
            <img
              src={dhvsuLogo}
              alt="logo"
              width={224}
              height={82}
              className="h-auto w-[120px] lg:w-[180px]"
            />
          </div>

          <Outlet />
        </section>

        <FloatingNav />
      </div>
    </>
  );
}
