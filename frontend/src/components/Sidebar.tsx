import { useState } from "react";
import { dhvsuLogo } from "../utils/Images";
import {
  FaHome,
  FaChevronDown,
  FaChevronUp,
  FaCalendarAlt,
  FaRegUserCircle,
  FaRegUser,
  FaListUl,
  FaFileContract,
} from "react-icons/fa";
import { LuFileStack } from "react-icons/lu";
import { TbMessageCircle } from "react-icons/tb";
import {
  MdGrade,
  MdOutlineNoteAlt,
  MdOutlinePayment,
  MdLogout,
} from "react-icons/md";
import { IoIosHelpCircleOutline, IoMdSettings } from "react-icons/io";

type SidebarProps = {
  isCollapsed: boolean;
  toggleCollapse: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleCollapse }) => {
  const [isStudentDropdownOpen, setIsStudentDropdownOpen] = useState(false);

  const toggleStudentDropdown = () => {
    setIsStudentDropdownOpen(!isStudentDropdownOpen);
  };

  return (
    <>
      {/* temporary lightmaroon to see the div */}
      <div
        className={`top-0 bottom-0 bg-light-maroon fixed text-white px-4 flex flex-col ${
          isCollapsed ? "w-16 border-r" : "w-64"
        } transition-all duration-300`}
      >
        <div className="flex absolute items-center justify-center py-2">
          <div className={isCollapsed ? "w-10 h-auto -ml-1" : "w-14 h-14 pr-2"}>
            <img src={dhvsuLogo} alt="dhvsulogo" className="mt-1" />
          </div>
          <div className="font-bold py-2 px-0 text-sm-title w-sm-title">
            <h1>{isCollapsed ? "" : "DON HONORIO VENTURA STATE UNIVERSITY"}</h1>
          </div>
        </div>

        <div className="flex justify-end mt-20">
          <button onClick={toggleCollapse} className="p-4 focus:outline-none">
            {isCollapsed ? (
              <div className="rotate-180 text-lg absolute ">←</div>
            ) : (
              "←"
            )}
          </button>
        </div>

        <div className="absolute bg-blue-200 -right-[2rem] mt-[23rem]">
          {isCollapsed ? <button onClick={toggleCollapse}>arrow</button> : ""}
        </div>

        <nav className="flex-grow">
          <ul
            className={`flex flex-col gap-4 mt-16 ${
              isCollapsed ? "items-center justify-center" : ""
            }`}
          >
            <li className={`hoverNav ${isCollapsed ? "px-2" : ""}`}>
              <a href="/">
                <div className="flex font-bold ">
                  {isCollapsed ? (
                    <FaHome className="text-2xl" />
                  ) : (
                    <div className="flex font-bold px-6">
                      <FaHome className="text-4xl pr-2" />
                      <h1 className="text-xl">Dashboard</h1>
                    </div>
                  )}
                </div>
              </a>
            </li>
            <li className={`hoverNav ${isCollapsed ? "px-2" : ""}`}>
              <a href="/">
                <div className="flex font-bold">
                  {isCollapsed ? (
                    <FaCalendarAlt className="text-2xl" />
                  ) : (
                    <div className="flex font-bold px-6">
                      <FaCalendarAlt className="text-2xl pr-2" />
                      <h1>Calendar</h1>
                    </div>
                  )}
                </div>
              </a>
            </li>

            <li
              className={`hoverNav ${isCollapsed ? "px-2" : ""}  ${
                isStudentDropdownOpen
                  ? "bg-white text-main-maroon rounded-full"
                  : ""
              }`}
            >
              <div
                className="flex justify-between items-center"
                onClick={toggleStudentDropdown}
              >
                <a href="/">
                  <div className="flex font-bold">
                    {isCollapsed ? (
                      <FaRegUserCircle className="text-2xl" />
                    ) : (
                      <div className="flex font-bold px-6">
                        <FaRegUserCircle className="text-2xl pr-2" />
                        <h1>Student</h1>
                      </div>
                    )}
                  </div>
                </a>

                {!isCollapsed &&
                  (isStudentDropdownOpen ? (
                    <FaChevronUp
                      className="text-sm mr-3"
                      onClick={toggleStudentDropdown}
                    />
                  ) : (
                    <FaChevronDown
                      className="text-sm mr-3"
                      onClick={toggleStudentDropdown}
                    />
                  ))}
              </div>
            </li>

            {/* test  */}

            {!isCollapsed && isStudentDropdownOpen && (
              <ul className="pl-10  flex flex-col gap-2 -mt-1">
                <li className="cursor-pointer">
                  <a href="/">
                    <div className="flex font-bold px-6">
                      <FaRegUser className="text-2xl pr-2" />
                      <h1>Profile</h1>
                    </div>
                  </a>
                </li>
                <li className="cursor-pointer">
                  <a href="/">
                    <div className="flex font-bold px-6">
                      <LuFileStack className="text-2xl pr-2" />
                      <h1>All Courses</h1>
                    </div>
                  </a>
                </li>
                <li className="cursor-pointer">
                  <a href="/">
                    <div className="flex font-bold px-6">
                      <TbMessageCircle className="text-2xl pr-2" />
                      <h1>Messages</h1>
                    </div>
                  </a>
                </li>
                <li className="cursor-pointer">
                  <a href="/">
                    <div className="flex font-bold px-6">
                      <FaListUl className="text-2xl pr-2" />
                      <h1>Subjects Enrolled</h1>
                    </div>
                  </a>
                </li>
                <li className="cursor-pointer">
                  <a href="/">
                    <div className="flex font-bold px-6">
                      <MdGrade className="text-2xl pr-2" />
                      <h1>Grades</h1>
                    </div>
                  </a>
                </li>
                <li className="cursor-pointer">
                  <a href="/">
                    <div className="flex font-bold px-6">
                      <MdOutlineNoteAlt className="text-2xl pr-2" />
                      <h1>Evaluation</h1>
                    </div>
                  </a>
                </li>
              </ul>
            )}

            {/* test */}
            <li className={`hoverNav ${isCollapsed ? "px-2" : ""}`}>
              <a href="/">
                <div className="flex font-bold">
                  {isCollapsed ? (
                    <FaFileContract className="text-2xl" />
                  ) : (
                    <div className="flex font-bold px-6">
                      <FaFileContract className="text-xl pr-2" />
                      <h1>Enrollment</h1>
                    </div>
                  )}
                </div>
              </a>
            </li>
            <li className={`hoverNav ${isCollapsed ? "px-2" : ""}`}>
              <a href="/">
                <div className="flex font-bold">
                  {isCollapsed ? (
                    <MdOutlinePayment className="text-2xl" />
                  ) : (
                    <div className="flex font-bold px-6">
                      <MdOutlinePayment className="text-2xl pr-2" />
                      <h1>Payment</h1>
                    </div>
                  )}
                </div>
              </a>
            </li>
            <li className={`hoverNav ${isCollapsed ? "px-2" : ""}`}>
              <a href="/">
                <div className="flex font-bold">
                  {isCollapsed ? (
                    <IoIosHelpCircleOutline className="text-2xl" />
                  ) : (
                    <div className="flex font-bold px-6">
                      <IoIosHelpCircleOutline className="text-3xl pr-2" />
                      <h1>Help</h1>
                    </div>
                  )}
                </div>
              </a>
            </li>
          </ul>
        </nav>
        {isCollapsed ? <hr className="py-2 border-t-2" /> : ""}
        <div className="-ml-1p-4 mb-5">
          <ul
            className={`flex flex-col gap-3 ${
              isCollapsed ? "items-center justify-center" : ""
            }`}
          >
            <li className={`hoverNav ${isCollapsed ? "px-2" : ""}`}>
              <a href="/">
                <div className="flex font-bold">
                  {isCollapsed ? (
                    <IoMdSettings className="text-2xl" />
                  ) : (
                    <div className="flex font-bold px-6">
                      <IoMdSettings className="text-3xl pr-2" />
                      <h1>Settings</h1>
                    </div>
                  )}
                </div>
              </a>
            </li>
            <li className={`hoverNav ${isCollapsed ? "px-2" : ""}`}>
              <a href="/">
                <div className="flex font-bold">
                  {isCollapsed ? (
                    <MdLogout className="text-2xl" />
                  ) : (
                    <div className="flex font-bold px-6">
                      <MdLogout className="text-3xl pr-2" />
                      <h1>Log out</h1>
                    </div>
                  )}
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
