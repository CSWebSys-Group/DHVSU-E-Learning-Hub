import { useParams } from "react-router-dom";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

const EnrolledSubject = () => {
  const { id } = useParams();

  const deadlines = [
    {
      title: "Multiple Choice",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      title: "Essay Submission",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      title: "Project Presentation",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      title: "Final Exam",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      title: "Assignment 4",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
  ];

  const resources = [
    { title: "Video Sample" },
    { title: "Lecture Slides" },
    { title: "Study Guide" },
    { title: "Quiz Questions" },
    { title: "Recommended Reading" },
    { title: "Tutorial Link" },
  ];

  const [showAllDeadlines, setShowAllDeadlines] = useState(false);
  const [showAllResources, setShowAllResources] = useState(false);

  return (
    <div className="p-3 flex flex-col items-center justify-center mx-auto max-w-screen-xl">
      <div className="flex items-center justify-between bg-brand h-[150px] rounded-2xl w-full max-w-screen-xl p-2 md:h-[180px] shadow-md">
        <div className="left-side flex flex-col gap-1 text-white px-3">
          <h1 className="font-bold text-2xl md:text-4xl">CSOS 313</h1>
          <p className="text-sm">Operating Systems</p>
          <p className="text-sm">BSCS-3B</p>
          <p className="text-sm">OCAMPO, RAMONSITO D.</p>
        </div>
        <div className="right-side hidden md:block">
          <div className="bg-white rounded-full h-[70px] w-[70px] shadow-lg">
            .
          </div>
        </div>
      </div>
      <div className="my-2 py-2 text-white font-semibold px-[10px] rounded-lg flex items-center gap-2 bg-brand ml-auto">
        <button className="bg-white text-brand font-bold py-1 px-4 rounded-md">
          Create
        </button>
        <FaPlus />
      </div>
      <div className="container-dl-resources flex flex-col md:flex-row w-full max-w-screen-xl justify-center gap-6 mx-auto">
        <div>
          <div className="bg-white rounded-xl w-full md:w-[450px] p-4 mb-6 md:mb-0 shadow-lg overflow-hidden">
            <h1 className="text-3xl font-bold text-brand">Deadlines</h1>
            <hr className="w-[150px] h-[5px] bg-brand" />
            {deadlines.slice(0, 3).map((deadline, index) => (
              <div
                key={index}
                className="border-2 text-brand border-brand rounded-md p-2 mt-2 shadow-sm hover:shadow-md hover:text-white hover:bg-brand transition"
              >
                <h1 className="font-bold text-lg">{deadline.title}</h1>
                <p>{deadline.description}</p>
              </div>
            ))}
            {showAllDeadlines &&
              deadlines.slice(3).map((deadline, index) => (
                <div
                  key={index + 3}
                  className="border-2 text-brand border-brand rounded-md p-2 mt-2 shadow-sm hover:shadow-md hover:text-white hover:bg-brand transition"
                >
                  <h1 className="font-bold text-lg">{deadline.title}</h1>
                  <p>{deadline.description}</p>
                </div>
              ))}
            <div className="flex justify-center items-center text-white text-center mt-2 p-2 px-5 rounded-md font-semibold bg-brand w-[200px] mx-auto shadow-sm hover:shadow-md transition">
              <button onClick={() => setShowAllDeadlines(!showAllDeadlines)}>
                {showAllDeadlines ? "Show Less" : "View All"}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4 w-full md:w-auto">
            <button className="bg-brand text-white py-2 px-8 font-bold rounded-md w-[200px] shadow-sm hover:shadow-md transition">
              Join Meeting
            </button>
            <button className="bg-brand text-white py-2 px-8 font-bold rounded-md w-[200px] shadow-sm hover:shadow-md transition">
              View Chat
            </button>
          </div>
        </div>
        <div className="bg-white rounded-md w-full md:w-[800px] p-4 shadow-lg">
          <h1 className="text-3xl font-bold text-brand">Resources</h1>
          <hr className="w-[150px] h-[5px] bg-brand" />
          {resources.slice(0, 5).map((resource, index) => (
            <div key={index} className="mt-2 font-semibold text-lg">
              <div className="bg-brand px-4 p-2 rounded-lg text-white shadow-sm hover:shadow-md transition">
                {resource.title}
              </div>
            </div>
          ))}
          {showAllResources &&
            resources.slice(5).map((resource, index) => (
              <div key={index + 5} className="mt-2 font-semibold text-lg">
                <div className="bg-brand px-4 p-2 rounded-lg text-white shadow-sm hover:shadow-md transition">
                  {resource.title}
                </div>
              </div>
            ))}
          <div className="flex justify-center items-center text-white text-center mt-4 p-2 px-5 rounded-md font-semibold bg-brand w-[200px] mx-auto shadow-sm hover:shadow-md transition">
            <button onClick={() => setShowAllResources(!showAllResources)}>
              {showAllResources ? "Show Less" : "View All"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrolledSubject;
