import SubjectCard from "@/components/SubjectCard";
import Task from "@/components/Task";
import React from "react";

const taskDummyData = [
  {
    id: 1,
    subject_code: "CSAC 313",
    task_name: "Solve time complexity",
    task_description: "Solve the time complexity of the following:",
    due_date: new Date(Date.now()),
  },
  {
    id: 2,
    subject_code: "CSPL 313",
    task_name: "Semantics and Syntax",
    task_description:
      "Choose a program language and show its semantics and syntax",
    due_date: new Date(Date.now()),
  },
  {
    id: 3,
    subject_code: "CSOS 313",
    task_name: "Describe Linux OS",
    task_description: "Describe linux OS on a essay form minimum of 300 words",
    due_date: new Date(Date.now()),
  },
];

const subjectDummyData = [
  {
    id: 1,
    subject_code: "CSOS 313",
    subject_name: "Operating System",
    profileImage: null,
  },
  {
    id: 2,
    subject_code: "CSAC 313",
    subject_name: "Time Complexity",
    profileImage: null,
  },
];

const Subjects = () => {
  return (
    <div>
      <div className="flex flex-col w-full mx-auto bg-[#fff7f4] shadow-drop-1 rounded-lg py-2">
        <div className="flex items-center justify-between w-full">
          <button className="flex items-center pr-2 hover:bg-gray-300 transition-all duration-300 py-20 rounded-r-lg hover:text-DHVSU-red">
            <div className="pl-2 lg:pr-2 lg:pl-3 focus:outline-none z-10 py-0 px-0 h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
          </button>

          <div className="border-r border-DHVSU-black h-full"></div>

          <div className="overflow-hidden w-full mx-0">
            <div className="flex transition-transform duration-500 h-56 md:h-60 lg:h-64 w-full">
              {/* Task card */}
              {taskDummyData.map((task) => (
                <Task
                  id={task.id}
                  subject_code={task.subject_code}
                  task_name={task.task_name}
                  task_description={task.task_description}
                  due_date={task.due_date}
                />
              ))}
            </div>
          </div>

          <button className="flex items-center pl-2 hover:bg-gray-300 transition-all duration-300 py-20 rounded-l-lg hover:text-DHVSU-red">
            <div className="pr-2 lg:pr-3 lg:pl-2 focus:outline-none z-10 py-0 px-0 h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>

      <div className="text-lg font-bold py-6 pl-6 pt-10 pb-2 lg:px-14">
        Enrolled Subjects
      </div>

      <div id="course-content" className="p-6 pt-1 lg:px-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Map SubjectCard.tsx */}
          {subjectDummyData.map((subject) => (
            <SubjectCard
              key={subject.id}
              id={subject.id}
              subject_code={subject.subject_code}
              subject_name={subject.subject_name}
              profileImage={subject.profileImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subjects;
