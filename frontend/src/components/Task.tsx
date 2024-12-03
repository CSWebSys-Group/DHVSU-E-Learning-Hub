import { formatDate } from "@/lib/utils";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  id: number;
  subject_code: string;
  task_name: string;
  task_description: string;
  due_date: Date;
};

const Task = ({
  id,
  subject_code,
  task_name,
  task_description,
  due_date,
}: Props) => {
  return (
    <Link to={`/`} className="flex-none w-full md:w-1/2 lg:w-1/3 px-2">
      <div className="group bg-white border-2 shadow-md border-brand rounded-[30px] p-6 text-white h-full flex flex-col justify-between transition-all duration-300 ease-in-out hover:bg-brand">
        <div className="flex items-center space-x-2">
          <img
            src="./img/sample-img.jpg"
            alt="sample image"
            className="w-8 h-8 rounded-full border-[2px] border-brand border-solid transition-all duration-300 ease-in-out group-hover:border-white"
          />
          <h3 className="text-lg font-bold text-brand transition-colors duration-300 ease-in-out group-hover:text-white">
            {subject_code}
          </h3>
        </div>
        <hr className="border-[0.12rem] m-0 border-brand transition-colors duration-300 ease-in-out group-hover:border-white" />
        <div className="bg-brand rounded-[20px] p-5 h-[55%] content-center transition-colors duration-300 ease-in-out group-hover:bg-white">
          <p className="text-sm font-semibold text-justify line-clamp-3 text-white transition-colors duration-300 ease-in-out group-hover:text-brand">
            {task_description}
          </p>
        </div>
        <p className="text-xs font-semibold text-right underline text-brand transition-colors duration-300 ease-in-out group-hover:text-white">
          {formatDate(due_date)}
        </p>
      </div>
    </Link>
  );
};

export default Task;
