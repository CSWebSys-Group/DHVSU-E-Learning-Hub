import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { RiMenu4Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import dhvsuLogo from "../assets/images/dhvsu-logo.png";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const getNavLinkClasses = (isActive) =>
    `text-white relative after:content-[""] after:block after:w-0 after:h-[3px] after:bg-[#FFBA15] after:absolute after:mt-[2px] after:left-0 
     hover:after:w-full hover:after:transition-all after:rounded-full 
     ${isActive ? "after:w-full" : "after:w-0"}`;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
                  to="/online-services"
                  className={({ isActive }) => getNavLinkClasses(isActive)}
                >
                  Online Services
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/features"
                  className={({ isActive }) => getNavLinkClasses(isActive)}
                >
                  Features
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Desktop login button */}
          <div>
            <button
              className="hidden md:block text-light-400 border rounded-full px-5 py-1 font-semibold text-sm md:text-base md:mr-2 lg:text-lg lg:mr-10 
              bg-gradient-to-r from-brand via-[#854335] to-[#935B4F] 
              transition-all duration-300 transform hover:scale-105 hover:from-[#935B4F] hover:via-[#854335] hover:to-brand hover:text-white"
            >
              LOG IN
            </button>
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
            <NavLink to="login">LOG IN</NavLink>
          </li>
        </ul>
      </nav>
      {/* <div>test</div> */}
      {/* Outlet renders the nested routes */}
      <Outlet />
    </div>
  );
}
