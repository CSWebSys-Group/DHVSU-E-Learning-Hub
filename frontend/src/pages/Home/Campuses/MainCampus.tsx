import casLogo from "../../../assets/images/cas-logo.png";
import cbsLogo from "../../../assets/images/cbs-logo.png";
import ccsLogo from "../../../assets/images/ccs-logo.png";
import ceaLogo from "../../../assets/images/cea-logo.png";
import chtmLogo from "../../../assets/images/chtm-logo.png";
import citLogo from "../../../assets/images/cit-logo.png";
import coeLogo from "../../../assets/images/coe-logo.png";
import csspLogo from "../../../assets/images/cssp-logo.png";
import lhsLogo from "../../../assets/images/lhs-logo.png";
import shsLogo from "../../../assets/images/shs-logo.png";

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

const colleges: College[] = [
  {
    id: 1,
    logo: casLogo,
    title: "College of Arts and Sciences",
    courses: [
      "Bachelor of Science in Biology",
      "Bachelor of Science in Environmental Science",
      "Bachelor of Science in Mathematics",
      "Bachelor of Science in Statistics",
    ],
  },
  {
    id: 2,
    logo: cbsLogo,
    title: "College of Business Studies",
    courses: [
      "Bachelor of Science in Business Administration (Major in Marketing Management)",
      "Bachelor of Science in Business Administration (Major in Business Economics)",
      "Bachelor of Science in Entrepreneurship",
      "Bachelor of Science in Accountancy",
      "Bachelor of Science in Accounting Information Systems",
      "Bachelor in Public Administration",
      "Bachelor of Science in Legal Management",
      "Bachelor of Science in Real Estate Management",
      "Bachelor of Science in Logistics and Supply Chain Management",
    ],
  },
  {
    id: 3,
    logo: ccsLogo,
    title: "College of Computing Studies",
    courses: [
      "Bachelor of Science in Information Technology",
      "Bachelor of Science in Computer Science",
      "Bachelor of Science in Information Systems",
      "Associate in Computer Technology (2-Year Diploma Program)",
    ],
  },
  {
    id: 4,
    title: "College of Education",
    logo: coeLogo,
    courses: [
      {
        category: "Bachelor of Elementary Education",
        sub: ["Major in General Education"],
      },
      {
        category: "Bachelor of Secondary Education",
        sub: [
          "Major in Mathematics",
          "Major in Filipino",
          "Major in English",
          "Major in General Science",
          "Major in Social Studies",
        ],
      },
      "Bachelor in Physical Education",
      {
        category: "Bachelor of Technical-Vocational Teacher Education",
        sub: ["Major in Home Economics", "Major in Industrial Arts"],
      },
      {
        category: "Bachelor in Technical and Livelihood Education",
        sub: ["Major in Food and Service Management"],
      },
    ],
  },
  {
    id: 5,
    logo: ceaLogo,
    title: "College of Engineering & Architecture",
    courses: [
      "Bachelor of Science in Architecture",
      "Bachelor of Science in Civil Engineering",
      "Bachelor of Science in Computer Engineering",
      "Bachelor of Science in Electrical Engineering",
      "Bachelor of Science in Electronics Engineering",
      "Bachelor of Science in Industrial Engineering",
      "Bachelor of Science in Mechanical Engineering",
    ],
  },
  {
    id: 6,
    logo: chtmLogo,
    title: "College of Hospitality and Tourism Management",
    courses: [
      "Bachelor of Science in Hospitality Management",
      "Bachelor of Science in Tourism Management",
      "Bachelor of Science in Tourism Management Major in Events Management",
    ],
  },
  {
    id: 7,
    logo: citLogo,
    title: "College of Industrial Technology",
    courses: [
      {
        category: "Bachelor of Science in Industrial Technology",
        sub: [
          "Major in Automotive Technology",
          "Major in Electronics Technology",
          "Major in Electrical Technology",
          "Major in Food and Service Management",
          "Major in Garments and Fashion Design",
          "Major in Graphics Technology",
          "Major in Beauty Care and Wellness",
          "Major in Mechanical Technology",
          "Major in Welding Technology",
          "Major in Mechatronics Technology",
          "Major in Instrumentation and Control Technology",
          "Major in Woodworking Technology",
        ],
      },
    ],
  },
  {
    id: 8,
    logo: csspLogo,
    title: "College of Social Science and Philosophy",
    courses: [
      "Bachelor of Science in Human Services",
      "Bachelor of Science in Psychology",
      "Bachelor of Science in Social Work",
      "Bachelor of Arts in Sociology",
    ],
  },
  {
    id: 9,
    logo: lhsLogo,
    title: "Laboratory High School",
    courses: [
      "Basic Education Curriculum",
      "Special Math and Science Curriculum",
    ],
  },
  {
    id: 10,
    logo: shsLogo,
    title: "Senior High School",
    courses: [
      {
        category: "ACADEMIC TRACK",
        sub: [
          "Accountancy, Business and Management (ABM) Strand",
          "Humanities and Social Sciences (HUMSS) Strand",
          "Science, Technology, Engineering and Mathematics (STEM) Strand",
        ],
      },
      {
        category: "TECHNICAL-VOCATIONAL-LIVELIHOOD TRACK",
        sub: [
          "Home Economics Strand",
          "Specialization: Dressmaking and Tailoring, Food and Beverage Services, Bread and Pastry Production & Cookery",
          "Industrial Arts Strand",
          "Specialization: Electrical Installation and Maintenance",
        ],
      },
    ],
  },
];

const MainCampus = () => {
  return (
    <div className="px-[20px] py-[20px] flex flex-col gap-5 max-w-screen-xl mx-auto justify-center items-center mb-10 md:mt-7 md:gap-8 lg:mt-20 lg:gap-16">
      {colleges.map((college, index) => (
        <div
          key={college.id}
          className={`dep-container flex flex-col sm:flex-row ${
            index % 2 === 0
              ? "sm:flex-row bg-[#F1E8E7]"
              : "sm:flex-row-reverse bg-[#F1E2E0]"
          } gap-4 justify-center items-center border-brand border-[2px] px-4 py-4 rounded-lg w-full shadow-[5px_5px_3px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out hover:translate-y-[-8px] hover:shadow-[4px_4px_10px_rgba(0,0,0,0.2)] md:gap-[50px] md:py-8 lg:py-10 `}
        >
          {/* Logo Section */}
          <div className="md:w-1/3 lg:w-1/3">
            <img
              src={college.logo} // Replace dynamically
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

export default MainCampus;
