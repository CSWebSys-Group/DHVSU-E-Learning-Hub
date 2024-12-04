import { useState, useEffect } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { RiMenu4Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import dhvsuLogo from "../assets/images/dhvsu-logo.png";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";

import { FaArrowUp } from "react-icons/fa";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const getNavLinkClasses = (isActive: boolean) =>
    `text-white relative after:content-[""] after:block after:w-0 after:h-[3px] after:bg-[#FFBA15] after:absolute after:mt-[2px] after:left-0 
     hover:after:w-full hover:after:transition-all after:rounded-full 
     ${isActive ? "after:w-full" : "after:w-0"}`;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Show button when user scrolls down
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-[#F1E2E0] ">
      <nav className="bg-gradient-to-r from-brand via-[#854335] to-[#935B4F] h-16 md:h-20 lg:h-24 px-2 py-2 w-full sticky top-0 z-50">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div>
            <img
              src={dhvsuLogo}
              alt="logo"
              className="w-12 md:w-16 lg:w-20 ml-10"
            />
          </div>

          {/* Desktop menu items */}
          <div>
            <ul className="hidden md:flex space-x-10 text-light-400 font-semibold text-base md:text-lg lg:text-xl">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => getNavLinkClasses(isActive)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/campuses"
                  className={({ isActive }) => getNavLinkClasses(isActive)}
                >
                  Campuses
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about-us"
                  className={({ isActive }) => getNavLinkClasses(isActive)}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact-us"
                  className={({ isActive }) => getNavLinkClasses(isActive)}
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Desktop login button */}
          <div>
            <Link to="auth/login">
              <button
                className="hidden md:block text-light-400 border rounded-full px-5 py-1 font-semibold text-sm md:text-base md:mr-2 lg:text-lg lg:mr-10 
              bg-gradient-to-r from-brand via-[#854335] to-[#935B4F] 
              transition-all duration-300 transform hover:scale-105 hover:from-[#935B4F] hover:via-[#854335] hover:to-brand hover:text-white"
              >
                LOG IN
              </button>
            </Link>
          </div>

          {/* Hamburger  */}
          <button
            className="md:hidden p-2 ml-auto"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <IoMdClose className="text-white text-3xl" />
            ) : (
              <RiMenu4Fill className="text-white text-3xl" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-brand bg-opacity-50 -z-10"
            onClick={toggleMenu} // Close the menu if background is clicked
          ></div>
        )}

        {/* Mobile menu items */}
        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:hidden space-y-2 mt-10 px-2 z-20 flex flex-col justify-center items-center gap-4 font-semibold text-light-400 text-lg`}
        >
          <li className="hover:text-brand">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="hover:text-brand">
            <NavLink to="campuses">Campuses</NavLink>
          </li>
          <li className="hover:text-brand">
            <NavLink to="online-services">Online Services</NavLink>
          </li>
          <li className="hover:text-brand">
            <NavLink to="features">Features</NavLink>
          </li>
          <li className="hover:text-brand">
            <NavLink to="/auth/login">LOG IN</NavLink>
          </li>
        </ul>
      </nav>

      {/* Outlet renders the nested routes */}
      <Outlet />

      {/* scroll to top button */}
      <button
        className={`fixed bottom-5 right-5 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-brand via-[#854335] to-[#935B4F] text-white shadow-lg transition-all duration-300 transform group hover:w-36 hover:rounded-xl hover:bg-gradient-to-r hover:from-[#935B4F] hover:via-[#854335] hover:to-brand ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={scrollToTop}
      >
        <FaArrowUp className="text-xl transition-transform duration-300 group-hover:opacity-0" />

        <span className="ml-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 absolute transform  group-hover:translate-x-0">
          Back to Top
        </span>
      </button>

      {/* foooter  */}
      {/* bg-white */}
      <footer className=" bottom-0 h-[300px] flex flex-col md:h-[400px] lg:h-[600px] ">
        <div className="relative mt-auto bg-gradient-to-b from-brand via-[#92260E] to-[#A32A10] h-[230px] px-5 py-5 w-full flex justify-end items-center flex-col md:h-[300px] lg:h-[380px]">
          <div className="w-full flex flex-col justify-center  md:flex-row md:px-6 lg:mb-4 max-w-screen-lg relative">
            <div className="absolute animate-bounce-updown shadow-lg shadow-[#A9847C] -top-[150px] inset-x-0 mx-5 h-[130px] bg-gradient-to-tl from-[#A9847C]  via-[#C1ACA7] to-[#D9D7D6] flex justify-center items-center rounded-xl  md:h-[180px] md:-top-[210px] lg:h-[250px] lg:-top-[280px] lg:mx-[70px]  max-w-screen-lg">
              {/* last stop spacing  */}
              <div className="flex px-4 text-brand md:px-10 ">
                <div className="flex flex-col md:gap-2">
                  <h1 className="font-bold text-lg md:text-3xl lg:text-4xl">
                    Not sure where to start?
                  </h1>
                  <p className="text-[11px] font-semibold md:text-[16px] lg:text-[20px]">
                    Let's discuss how can we guide your journey at Don Honorio
                    Ventura State University. Schedule a free consultation to
                    explore your options, learn about our programs, and see how
                    can we help you achieve your goals.
                  </p>
                </div>
                <div className="flex justify-center items-center md:px-2">
                  <img
                    src={dhvsuLogo}
                    alt="dhvsu logo"
                    className="w-[300px] h-auto md:w-[320px] lg:w-[400px]"
                  />
                </div>
              </div>
            </div>
            <div className="footer-left text-light-400 hidden md:block md:w-1/2 ">
              <div>
                <h1 className="font-bold text-xl lg:text-4xl ">
                  Let's make your future great together
                </h1>
              </div>
              <div className="flex justify-center border border-white items-center text-brand bg-white w-[120px] gap-2 rounded-full px-2 py-[5px] mt-4 lg:w-[150px] lg:h-[40px] lg:text-lg lg:mt-5 hover:bg-brand hover:text-white hover:border-white cursor-pointer transition-all duration-300">
                <Link to="#" className="font-bold">
                  Sign In
                </Link>
                <MdArrowOutward />
              </div>
            </div>

            <div className="footer-right text-light-400 flex flex-col gap-4 justify-center items-center md:w-1/2">
              <div className="text-center md:text-[17px] lg:text-[21px]">
                <h1>
                  Empowering Minds. Advancing Techonology, and Creating Brighter
                  Futures for Tomorrow's Leaders.
                </h1>
              </div>
              <div className="flex gap-2 font-semibold">
                <div className="group flex justify-center items-center gap-2 border px-[10px] py-[2px] rounded-full md:py-[5px] md:px-[12px] lg:w-[150px] lg:h-[40px] lg:mt-2 transition duration-300 ease-in-out transform hover:bg-light-300 hover:scale-105">
                  <div className="flex justify-center items-center p-[6px] text-brand bg-light-400 w-[20px] h-[20px] rounded-full md:w-[23px] md:h-[23px] transition duration-300 ease-in-out transform group-hover:scale-110">
                    <FaFacebookF />
                  </div>
                  <div className="group-hover:text-brand transition duration-300 ease-in-out">
                    <Link to="/fb">Facebook</Link>
                  </div>
                </div>

                <div className="group flex justify-center items-center gap-2 border px-[10px] py-[2px] rounded-full md:py-[5px] md:px-[12px] lg:w-[150px] lg:h-[40px] lg:mt-2 transition duration-300 ease-in-out transform hover:bg-light-300 hover:scale-105">
                  <div className="flex justify-center items-center p-[4px] text-brand bg-light-400 w-[20px] h-[20px] rounded-full md:w-[23px] md:h-[23px] transition duration-300 ease-in-out transform group-hover:scale-110">
                    <FaXTwitter />
                  </div>
                  <div className="group-hover:text-brand transition duration-300 ease-in-out">
                    <Link to="/fb">Twitter</Link>
                  </div>
                </div>

                <div className="group flex justify-center items-center gap-2 border px-[10px] py-[2px] rounded-full md:py-[5px] md:px-[12px] lg:w-[150px] lg:h-[40px] lg:mt-2 transition duration-300 ease-in-out transform hover:bg-light-300 hover:scale-105">
                  <div className="flex justify-center items-center p-[4px] text-brand bg-light-400 w-[20px] h-[20px] rounded-full md:w-[23px] md:h-[23px] transition duration-300 ease-in-out transform group-hover:scale-110">
                    <FaInstagram />
                  </div>
                  <div className="group-hover:text-brand transition duration-300 ease-in-out">
                    <Link to="/fb">Instagram</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col -mb-5 gap-2 py-3 w-full max-w-screen-lg">
            <div>
              <hr className="w-full border-t border-light-400 " />
            </div>
            <div className=" flex justify-between items-center px-2 ">
              <div className="hidden md:block text-light-400">
                <ul className="flex gap-3 text-sm lg:text-lg cursor-pointer">
                  <li className="transform transition-all duration-300 hover:scale-110">
                    Home
                  </li>
                  <li className="transform transition-all duration-300 hover:scale-110">
                    Campuses
                  </li>
                  <li className="transform transition-all duration-300 hover:scale-110">
                    Features
                  </li>
                  <li className="transform transition-all duration-300 hover:scale-110">
                    Sign In
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-xs text-light-400 md:text-sm">
                  &copy; 2024 DHVSU. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
