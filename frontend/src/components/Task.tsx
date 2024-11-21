import React from "react";
import { Link } from "react-router-dom";

type Props = {
  task_name: string;
  deadline: Date;
};

const Task = ({ task_name, deadline }: Props) => {
  return (
    <Link to={`/`} className="flex-none w-full md:w-1/2 lg:w-1/3 px-2">
      <div className="bg-dhvsu-light rounded-xl p-6 text-white h-full flex flex-col justify-between hover:bg-dhvsu-black">
        <div className="flex items-center space-x-2">
          <img
            src="./img/sample-img.jpg"
            alt="sample image"
            className="w-8 h-8 rounded-full border-[2px] border-DHVSU-white border-solid"
          />
          <h3 className="text-lg font-bold">{task_name}</h3>
        </div>
        <hr className="border-[0.12rem] m-0 border-white" />
        <div className="bg-white rounded-lg p-5 h-[55%] content-center">
          <p className="text-sm text-justify line-clamp-3 text-DHVSU-red">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores
            necessitatibus rerum reiciendis molestiae ipsam, libero aut
            voluptates maiores optio. Ad facilis soluta ab saepe iure enim, sint
            nobis delectus unde?
          </p>
        </div>
        <p className="text-xs text-right underline">Due Nov 6, 11:59 PM</p>
      </div>
    </Link>
  );
};

export default Task;
