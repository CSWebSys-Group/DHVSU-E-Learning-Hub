import { VelocityScroll } from "@/components/ui/scroll-based-scroll";
import { SwipeCarousel } from "@/components/SwipeCarousel";
import dhvsuLogo from "../../assets/images/dhvsu-logo.png";
import FloatingNav from "@/components/FloatingNav";

import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            {/* Sign Up and Log In layout*/}
            <div className="flex min-h-screen overflow-hidden">
                <section className="hidden w-1/2 items- bg-gradient-to-br from-brand-500 animated-background via-brand to-brand-300 lg:flex flex-col xl:w-2/5 gap-6 py-10">
                    <div className="flex gap-2 items-center justify-center">
                        <img
                            src={dhvsuLogo}
                            alt="logo"
                            width={64}
                            height={64}
                            className="h-auto"
                        />
                        <h4 className="h4 text-white font-bold">
                            Don Honorio Ventura State University{" "}
                        </h4>
                    </div>
                    <VelocityScroll
                        // key={}
                        text="APPLY NOW &#9679;"
                        default_velocity={5}
                        className="font-display text-center text-3xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-3xl md:leading-[5rem] bg-[#FABC3F] border-2 border-black z-5"
                    />
                    <div className="flex h-full flex-col justify-center items-center space-y-12 overflow-hidden mx-10">
                        <SwipeCarousel />
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
