import React, { useState } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";

import { RiMenu4Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import dhvsuLogo from "../assets/images/dhvsu-logo.png";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="bg-gradient-to-r from-brand via-[#c46262] to-[#a46363] h-16 px-2 py-2 w-full">
        <div className="flex justify-around items-center ">
          {/* Desktop menu items */}

          <div>
            <img src={dhvsuLogo} alt="logo" className="w-12  " />
          </div>

          <div>
            <ul className="hidden md:flex space-x-4 text-light-400 font-semibold">
              <li>
                <Link to="/">Home</Link>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li>
                <Link to="campuses">Campuses</Link>
              </li>
              <li>
                <Link to="online-services">Online Services</Link>
              </li>
              <li>
                <Link to="features">Features</Link>
              </li>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-brand-500" : "text-white"
                  }
                >
                  try
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            {/* ala pa hover */}
            <button className=" hidden md:block text-light-400 border rounded-full px-5 py-1 font-semibold  ">
              LOG IN
            </button>
          </div>

          {/* Hamburger button (visible only on mobile) */}

          <button
            className="md:hidden p-2 ml-auto"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {/* Conditionally render icons based on the menu state */}
            {isMenuOpen ? (
              <IoMdClose className="text-white text-3xl " />
            ) : (
              <RiMenu4Fill className="text-white text-3xl" />
            )}
          </button>
        </div>

        {/* Transparent background overlay when the menu is open */}
        {isMenuOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full  bg-brand bg-opacity-50 -z-10"
            onClick={toggleMenu} // Close the menu if background is clicked
          ></div>
        )}

        {/* Mobile menu items (shown when hamburger is clicked) */}
        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:hidden space-y-2 mt-10 px-2 z-20 flex flex-col justify-center items-center gap-4 font-semibold text-light-400 `}
        >
          <li className=" hover:text-brand ">
            <Link to="/">Home</Link>
          </li>
          <li className=" hover:text-brand ">
            <Link to="campuses">Campuses</Link>
          </li>
          <li className=" hover:text-brand ">
            <Link to="online-services">Online Services</Link>
          </li>
          <li className=" hover:text-brand ">
            <Link to="features">Features</Link>
          </li>
          <li className=" hover:text-brand ">
            <Link to="login">LOG IN</Link>
          </li>
        </ul>
      </nav>

      {/* Outlet renders the nested routes */}
      <Outlet />
    </div>
  );
}
