import { useState } from "react";
import SubjectCard from "@/components/SubjectCard";
import Task from "@/components/Task";
import { Link } from "react-router-dom";

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
  {
    id: 4,
    subject_code: "CSSE",
    task_name: "Define SDLC Models",
    task_description: "Describe all the SDLC Models chuchu",
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

const Index = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const tasksPerPage = 3;

  const handleNext = () => {
    if (currentIndex + tasksPerPage < taskDummyData.length) {
      setCurrentIndex(currentIndex + tasksPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - tasksPerPage >= 0) {
      setCurrentIndex(currentIndex - tasksPerPage);
    }
  };

  const visibleTasks = taskDummyData.slice(
    currentIndex,
    currentIndex + tasksPerPage
  );
  return (
    <div className="p-5">
      <div className="flex flex-col w-full  bg-[#F7F1EF] shadow-md rounded-[20px] py-5 mt-4">
        <div className="flex items-center justify-between w-full">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center pr-2 hover:bg-white transition-all duration-300 py-20 rounded-r-lg hover:text-DHVSU-red"
          >
            <div className="text-brand pl-2 lg:pr-2 lg:pl-3 focus:outline-none z-10 py-0 px-0 h-full">
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

          <div className="overflow-hidden w-full mx-0">
            <div className="flex transition-transform duration-500 h-56 md:h-60 lg:h-64 w-full">
              {visibleTasks.map((task) => (
                <Task
                  key={task.id}
                  id={task.id}
                  subject_code={task.subject_code}
                  task_name={task.task_name}
                  task_description={task.task_description}
                  due_date={task.due_date}
                />
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex + tasksPerPage >= taskDummyData.length}
            className="flex items-center pl-2 hover:bg-white transition-all duration-300 py-20 rounded-l-lg hover:text-DHVSU-red"
          >
            <div className="text-brand pr-2 lg:pr-3 lg:pl-2 focus:outline-none z-10 py-0 px-0 h-full">
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

      <div className="text-lg font-bold text-left text-brand py-6 pl-6 pt-10 pb-2 lg:px-14">
        Enrolled Subjects
      </div>

      <div id="course-content" className="p-6 pt-1 lg:px-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Map SubjectCard.tsx */}
          {subjectDummyData.map((subject) => (
            <Link
              key={subject.id}
              to={`/user/subjects/${subject.id}`}
              className="block"
            >
              <SubjectCard
                id={subject.id}
                subject_code={subject.subject_code}
                subject_name={subject.subject_name}
                profileImage={subject.profileImage}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
