import dhvsuLogo from "@/assets/icons/dhvsu-logo-v2.svg";
import FloatingNav from "@/components/FloatingNav";

import { Outlet } from "react-router-dom";

import dhvsuMain from "@/assets/images/dhvsu-main-image.jpg";

export default function Layout() {
  return (
    <>
      <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden">
        <section className="relative hidden h-full w-full items- bg-gradient-to-br from-brand-500 animated-background via-brand to-brand-300 lg:flex flex-col p-10">
          <img
            src={dhvsuMain}
            className="absolute inset-0 h-screen object-cover opacity-50"
          />
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
          {/* <SignUp /> */}
        </section>

        <FloatingNav />
      </div>
    </>
  );
}
