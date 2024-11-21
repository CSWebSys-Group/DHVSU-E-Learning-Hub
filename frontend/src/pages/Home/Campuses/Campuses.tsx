import { NavLink, Outlet } from "react-router-dom"; // Use NavLink for active state styling
import campusesBg from "../../../assets/images/campuses-bg.png";

const getNavLinkClasses = (isActive) =>
  `text-light-400 relative after:content-[""] after:block after:w-0 after:h-[3px] after:bg-[#FFBA15] 
   after:absolute after:mt-[2px] after:left-0 hover:after:w-full hover:after:transition-all 
   after:rounded-full ${
     isActive ? "after:w-full text-[#FFBA15] text-lg " : ""
   }`;

const Campuses = () => {
  return (
    <>
      {/* Header Section */}
      <div
        className="bg-cover bg-no-repeat h-[100px] w-full flex justify-center items-center"
        style={{ backgroundImage: `url(${campusesBg})` }}
      >
        <div>
          <h1 className="font-bold text-white text-xl">CURRICULAR OFFERINGS</h1>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="overflow-x-auto bg-brand">
        <ul className="flex px-2 py-[8px] gap-3 whitespace-nowrap uppercase font-semibold text-sm cursor-pointer">
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
