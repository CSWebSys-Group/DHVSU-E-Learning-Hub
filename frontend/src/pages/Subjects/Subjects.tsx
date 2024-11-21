import SubjectCard from "@/components/SubjectCard";
import React from "react";

const taskDummyData = [{}];

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
            <div
              id="carousel"
              className="flex transition-transform duration-500 h-56 md:h-60 lg:h-64 w-full"
            >
              {/* Task card */}
              <a href="#" className="flex-none w-full md:w-1/2 lg:w-1/3 px-2">
                <div className="bg-dhvsu-light rounded-xl p-6 text-white h-full flex flex-col justify-between hover:bg-dhvsu-black">
                  <div className="flex items-center space-x-2">
                    <img
                      src="./img/sample-img.jpg"
                      alt="sample image"
                      className="w-8 h-8 rounded-full border-[2px] border-DHVSU-white border-solid"
                    />
                    <h3 className="text-lg font-bold">SubCode</h3>
                  </div>
                  <hr className="border-[0.12rem] m-0 border-white" />
                  <div className="bg-white rounded-lg p-5 h-[55%] content-center">
                    <p className="text-sm text-justify line-clamp-3 text-DHVSU-red">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Dolores necessitatibus rerum reiciendis molestiae ipsam,
                      libero aut voluptates maiores optio. Ad facilis soluta ab
                      saepe iure enim, sint nobis delectus unde?
                    </p>
                  </div>
                  <p className="text-xs text-right underline">
                    Due Nov 6, 11:59 PM
                  </p>
                </div>
              </a>

              <a href="#" className="flex-none w-full md:w-1/2 lg:w-1/3 px-2">
                <div className="bg-dhvsu-light rounded-xl p-6 text-white h-full flex flex-col justify-between hover:bg-dhvsu-black">
                  <div className="flex items-center space-x-2">
                    <img
                      src="./img/sample-img.jpg"
                      alt="sample image"
                      className="w-8 h-8 rounded-full border-[2px] border-DHVSU-white border-solid"
                    />
                    <h3 className="text-lg font-bold">SubCode</h3>
                  </div>
                  <hr className="border-[0.12rem] m-0 border-white" />
                  <div className="bg-white rounded-lg p-5 h-[55%] content-center">
                    <p className="text-sm text-justify line-clamp-3 text-DHVSU-red">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Dolores necessitatibus rerum reiciendis molestiae ipsam,
                      libero aut voluptates maiores optio. Ad facilis soluta ab
                      saepe iure enim, sint nobis delectus unde?
                    </p>
                  </div>
                  <p className="text-xs text-right underline">
                    Due Nov 6, 11:59 PM
                  </p>
                </div>
              </a>

              <a href="#" className="flex-none w-full md:w-1/2 lg:w-1/3 px-2">
                <div className="bg-dhvsu-light rounded-xl p-6 text-white h-full flex flex-col justify-between hover:bg-dhvsu-black">
                  <div className="flex items-center space-x-2">
                    <img
                      src="./img/sample-img.jpg"
                      alt="sample image"
                      className="w-8 h-8 rounded-full border-[2px] border-DHVSU-white border-solid"
                    />
                    <h3 className="text-lg font-bold">SubCode</h3>
                  </div>
                  <hr className="border-[0.12rem] m-0 border-white" />
                  <div className="bg-white rounded-lg p-5 h-[55%] content-center">
                    <p className="text-sm text-justify line-clamp-3 text-DHVSU-red">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Dolores necessitatibus rerum reiciendis molestiae ipsam,
                      libero aut voluptates maiores optio. Ad facilis soluta ab
                      saepe iure enim, sint nobis delectus unde?
                    </p>
                  </div>
                  <p className="text-xs text-right underline">
                    Due Nov 6, 11:59 PM
                  </p>
                </div>
              </a>

              <a href="#" className="flex-none w-full md:w-1/2 lg:w-1/3 px-2">
                <div className="bg-dhvsu-light rounded-xl p-6 text-white h-full flex flex-col justify-between hover:bg-dhvsu-black">
                  <div className="flex items-center space-x-2">
                    <img
                      src="./img/sample-img.jpg"
                      alt="sample image"
                      className="w-8 h-8 rounded-full border-[2px] border-DHVSU-white border-solid"
                    />
                    <h3 className="text-lg font-bold">SubCode</h3>
                  </div>
                  <hr className="border-[0.12rem] m-0 border-white" />
                  <div className="bg-white rounded-lg p-5 h-[55%] content-center">
                    <p className="text-sm text-justify line-clamp-3 text-DHVSU-red">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Dolores necessitatibus rerum reiciendis molestiae ipsam,
                      libero aut voluptates maiores optio. Ad facilis soluta ab
                      saepe iure enim, sint nobis delectus unde?
                    </p>
                  </div>
                  <p className="text-xs text-right underline">
                    Due Nov 6, 11:59 PM
                  </p>
                </div>
              </a>

              <a href="#" className="flex-none w-full md:w-1/2 lg:w-1/3 px-2">
                <div className="bg-dhvsu-light rounded-xl p-6 text-white h-full flex flex-col justify-between hover:bg-dhvsu-black">
                  <div className="flex items-center space-x-2">
                    <img
                      src="./img/sample-img.jpg"
                      alt="sample image"
                      className="w-8 h-8 rounded-full border-[2px] border-DHVSU-white border-solid"
                    />
                    <h3 className="text-lg font-bold">SubCode</h3>
                  </div>
                  <hr className="border-[0.12rem] m-0 border-white" />
                  <div className="bg-white rounded-lg p-5 h-[55%] content-center">
                    <p className="text-sm text-justify line-clamp-3 text-DHVSU-red">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Dolores necessitatibus rerum reiciendis molestiae ipsam,
                      libero aut voluptates maiores optio. Ad facilis soluta ab
                      saepe iure enim, sint nobis delectus unde?
                    </p>
                  </div>
                  <p className="text-xs text-right underline">
                    Due Nov 6, 11:59 PM
                  </p>
                </div>
              </a>
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
