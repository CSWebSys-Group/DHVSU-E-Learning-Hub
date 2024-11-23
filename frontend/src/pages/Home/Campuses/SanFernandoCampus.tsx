import cbsLogo from "../../../assets/images/cbs-logo.png";
import chtmLogo from "../../../assets/images/chtm-logo.png";

type Course = {
  category: string;
  sub: string[];
};

type College = {
  id: number;
  logo: string;
  title: string;
  courses: (string | Course)[];
};

const collegesSanFernando: College[] = [
  {
    id: 1,
    logo: cbsLogo,
    title: "College of Business and Accountancy",
    courses: [
      {
        category: "Bachelor of Science in Business Administration",
        sub: ["Major in Marketing Management"],
      },
    ],
  },
  {
    id: 2,
    logo: chtmLogo,
    title: "College of Hospitality and Tourism Management",
    courses: ["Bachelor of Science in Tourism Management"],
  },
  {
    id: 3,
    logo: cbsLogo,
    title: "College of Public Administration",
    courses: ["Bachelor of Public Administration"],
  },
];

const SanFernandoCampus = () => {
  return (
    <div className="px-[20px] py-[20px] flex flex-col gap-5 max-w-screen-xl mx-auto justify-center items-center mb-10 md:mt-7 md:gap-8 lg:mt-20 lg:gap-16">
      {collegesSanFernando.map((college, index) => (
        <div
          key={college.id}
          className={`dep-container flex flex-col sm:flex-row ${
            index % 2 === 0
              ? "sm:flex-row bg-[#F1E8E7]"
              : "sm:flex-row-reverse bg-[#F1E2E0]"
          } gap-4 justify-center items-center border-brand border-[2px] px-4 py-4 rounded-lg  w-full shadow-[5px_5px_3px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out hover:translate-y-[-8px] hover:shadow-[4px_4px_10px_rgba(0,0,0,0.2)] md:gap-[50px] md:py-8 lg:py-10`}
        >
          {/* Logo Section */}
          <div className="md:w-1/3 lg:w-1/3">
            <img
              src={college.logo}
              alt={`${college.title} Logo`}
              className="w-[100px] h-auto md:w-[200px] lg:w-[300px]"
            />
          </div>

          {/* Text Section */}
          <div className="md:w-1/2">
            <h1 className="text-brand text-xl font-bold mb-2 md:text-2xl lg:text-4xl lg:mb-4">
              {college.title}
            </h1>
            <ul className="list-disc list-inside text-[15px] text-brand space-y-1 md:text-[20px] lg:text-[25px] lg:space-y-2">
              {college.courses.map((course, idx) =>
                typeof course === "string" ? (
                  <li key={idx}>{course}</li>
                ) : (
                  <li key={idx}>
                    <span className="font-semibold text-brand">
                      {course.category}
                    </span>
                    <ul className="list-[circle] list-inside pl-6 space-y-1 text-brand">
                      {course.sub.map((subCourse, subIdx) => (
                        <li key={subIdx}>{subCourse}</li>
                      ))}
                    </ul>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SanFernandoCampus;
