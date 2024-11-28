import { motion } from "framer-motion";

const Grades = () => {
  const studentInfo = {
    lastName: "Dela Cruz",
    firstName: "Juan",
    middleInitial: "D.",
    course: "Bachelor of Science in Computer Science",
  };

  const reportCardInfos = [
    {
      number: 1,
      subjectCode: "WEBSYS 313",
      descriptive: "Web System Technologies",
      units: 3,
      section: "BSCS-3B",
      finalAverage: 1.0,
      equivalentGrade: 1.0,
    },
    {
      number: 2,
      subjectCode: "CSAC 313 (D)",
      descriptive: "Algorithms and Complexity",
      units: 3,
      section: "BSCS-3B",
      finalAverage: 5,
      equivalentGrade: 5,
    },
    {
      number: 3,
      subjectCode: "CSOS 313 (D)",
      descriptive: "Operating Systems",
      units: 3,
      section: "BSCS-3B",
      finalAverage: 1.25,
      equivalentGrade: 1.25,
    },
    {
      number: 4,
      subjectCode: "CSPL 313 ",
      descriptive: "Programming Languages",
      units: 3,
      section: "BSCS-3B",
      finalAverage: null,
      equivalentGrade: null,
    },
  ];

  const getRemarks = (grade: number | null) => {
    if (grade === null) {
      return "Not yet posted";
    }
    return grade >= 1 && grade <= 3 ? "Passed" : "Failed";
  };

  const getRemarksColor = (grade: number | null) => {
    if (grade === null) {
      return "text-gray-500";
    }
    return grade >= 1 && grade <= 3 ? "text-green" : "text-red";
  };

  return (
    <motion.div
      className="bg-[#F1E8E7] rounded-lg h-screen m-4 p-4 lg:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-center text-brand text-3xl font-bold mb-6 lg:text-4xl">
        Report Card
      </h1>
      <div className="bg-[#fcfcfc] p-6 rounded-lg shadow-lg">
        <h1 className="text-xl text-brand">
          {`${studentInfo.lastName}, ${studentInfo.firstName} - ${studentInfo.course}`}
        </h1>
        <h2 className="text-center uppercase text-lg mt-2 text-brand font-bold">
          Academic Performance
        </h2>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full table-auto border-separate border-spacing-2 border rounded-lg">
            <thead className="bg-[#F1E8E7]">
              <tr className="text-brand">
                <th className="border px-4 py-2 rounded-l-lg">#</th>
                <th className="border px-4 py-2">Code</th>
                <th className="border px-4 py-2">Descriptive</th>
                <th className="border px-4 py-2">Units</th>
                <th className="border px-4 py-2">Section</th>
                <th className="border px-4 py-2">Final Average</th>
                <th className="border px-4 py-2">Equivalent Grade</th>
                <th className="border px-4 py-2 rounded-r-lg">Remarks</th>
              </tr>
            </thead>
            <tbody className="text-brand">
              {reportCardInfos.map((info, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-4 py-2 rounded-l-lg">
                    {info.number}
                  </td>
                  <td className="border px-4 py-2">{info.subjectCode}</td>
                  <td className="border px-4 py-2">{info.descriptive}</td>
                  <td className="border px-4 py-2">{info.units}</td>
                  <td className="border px-4 py-2">{info.section}</td>
                  <td className="border px-4 py-2 font-bold">
                    {info.finalAverage}
                  </td>
                  <td className="border px-4 py-2 font-bold">
                    {info.equivalentGrade}
                  </td>
                  <td
                    className={`border px-4 py-2 font-bold ${getRemarksColor(
                      info.finalAverage
                    )} rounded-r-lg`}
                  >
                    {getRemarks(info.finalAverage)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Grades;
