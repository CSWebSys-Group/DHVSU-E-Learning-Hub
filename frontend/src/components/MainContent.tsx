import React from "react";
interface MainContentProps {
  isCollapsed: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ isCollapsed }) => {
  return (
    <div
      className={`flex-1 h-screen bg-white p-6 transition-all duration-300 rounded-tl-[5rem] rounded-bl-[5rem]  ${
        isCollapsed ? "ml-[4.5rem] my-2" : "ml-[16rem]"
      }`}
    ></div>
  );
};

export default MainContent;
