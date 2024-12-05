import { formatDate, isPastDeadline } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  id: number;
  subject_code: string;
  title: string;
  description: string | null;
  due_date: Date;
  teacher_profile: string | null;
  teacher_profile_fallback: string;
  course_section?: string;
  user_type: "S" | "T";
};

const Task = ({
  id,
  subject_code,
  title,
  description,
  due_date,
  teacher_profile,
  teacher_profile_fallback,
  course_section,
  user_type,
}: Props) => {
  return (
    <Link
      to={`/user/activities/${id}`}
      className="flex-none w-full md:w-1/2 lg:w-1/3 px-2"
    >
      <div className="group bg-white border-2 shadow-md border-brand rounded-[30px] p-6 text-white h-full flex flex-col justify-between transition-all duration-300 ease-in-out hover:bg-brand">
        <div className="flex items-center space-x-2">
          <Avatar className="w-8 h-8 rounded-full border-[2px] border-brand border-solid transition-all duration-300 ease-in-out group-hover:border-white">
            <AvatarImage src={teacher_profile!} />
            <AvatarFallback>{teacher_profile_fallback}</AvatarFallback>
          </Avatar>
          <h3 className="text-lg font-bold text-brand transition-colors duration-300 ease-in-out group-hover:text-white">
            {subject_code} {course_section ? " - " + course_section : ""}
          </h3>
          {isPastDeadline(due_date) && user_type === "S" && (
            <h4 className="text-lg font-bold text-red-500 transition-colors duration-300 ease-in-out group-hover:text-white">
              LATE
            </h4>
          )}
        </div>
        <h3 className="text-lg my-2 font-bold text-brand transition-colors duration-300 ease-in-out group-hover:text-white">
          {title}
        </h3>
        <hr className="my-2 border-[0.12rem] m-0 border-brand transition-colors duration-300 ease-in-out group-hover:border-white" />
        <div className="bg-brand rounded-[20px] p-5 h-[55%] content-center transition-colors duration-300 ease-in-out group-hover:bg-white">
          <p className="text-sm font-semibold text-justify line-clamp-3 text-white transition-colors duration-300 ease-in-out group-hover:text-brand">
            {description || subject_code + " " + title}
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
