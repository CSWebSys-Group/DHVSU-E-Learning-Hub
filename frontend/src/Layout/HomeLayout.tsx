import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import { useState } from "react";

const HomeLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <div className=" bg-main-maroon">
        <div className="flex">
          <Sidebar
            isCollapsed={isCollapsed}
            toggleCollapse={() => setIsCollapsed(!isCollapsed)}
          />

          <MainContent isCollapsed={isCollapsed} />
        </div>
      </div>
    </>
  );
};

export default HomeLayout;
