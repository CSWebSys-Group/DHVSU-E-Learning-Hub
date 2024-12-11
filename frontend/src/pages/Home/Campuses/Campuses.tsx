import { useEffect } from "react";

import { NavLink, Outlet } from "react-router-dom";
import campusesBg from "../../../assets/images/campuses-bg.png";

const getNavLinkClasses = (isActive: boolean) =>
  `${
    isActive ? "text-brand font-bold bg-[#F2F2F2] scale-105" : "text-light-400"
  } 
   relative hover:text-brand hover:bg-[#F2F2F2] hover:scale-105 
   transition-all rounded-md p-2`;

const Campuses = () => {
  useEffect(() => {
    document.title = "Campuses | DHVSU E-Learning Hub";
  }, []);

  return (
    <>
      {/* Header Section */}
      <div
        className="bg-cover bg-no-repeat h-[100px] w-full flex justify-center items-center md:h-[195px] lg:h-[260px] xl:h-[390px]"
        style={{ backgroundImage: `url(${campusesBg})` }}
      >
        <div>
          <h1 className="font-bold text-white text-xl md:text-4xl lg:text-5xl xl:text-7xl">
            CURRICULAR OFFERINGS
          </h1>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="overflow-x-auto bg-brand lg:flex lg:justify-center lg:items-center">
        <ul className="flex px-2 py-[8px] gap-3 whitespace-nowrap uppercase font-semibold text-sm cursor-pointer md:px-5 md:py-[15px] md:text-lg md:gap-8 lg:py-[20px] lg:gap-10">
          <li>
            <NavLink
              to="/campuses/porac-campus"
              className={({ isActive }) => getNavLinkClasses(isActive)}
            >
              Porac Campus
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/campuses/apalit-campus"
              className={({ isActive }) => getNavLinkClasses(isActive)}
            >
              Apalit Campus
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/campuses/main-campus"
              className={({ isActive }) =>
                getNavLinkClasses(isActive || location.pathname === "/campuses")
              }
            >
              Main Campus
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/campuses/santo-tomas-campus"
              className={({ isActive }) => getNavLinkClasses(isActive)}
            >
              Santo Tomas Campus
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/campuses/lubao-campus"
              className={({ isActive }) => getNavLinkClasses(isActive)}
            >
              Lubao Campus
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/campuses/mexico-campus"
              className={({ isActive }) => getNavLinkClasses(isActive)}
            >
              Mexico Campus
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/campuses/candaba-campus"
              className={({ isActive }) => getNavLinkClasses(isActive)}
            >
              Candaba Campus
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/campuses/san-fernando-campus"
              className={({ isActive }) => getNavLinkClasses(isActive)}
            >
              City of San Fernando Campus
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Render Nested Routes */}
      <Outlet />
    </>
  );
};

export default Campuses;
