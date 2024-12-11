import LoadingSpinner from "@/components/LoadingSpinner";
import {
  CourseType,
  GradeType,
  SectionType,
  StudentCreds,
  SubjectType,
  UsersType,
} from "@/lib/types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Grades = ({ user }: { user: UsersType }) => {
  const user_creds = user.user_creds as StudentCreds;
  const [course, setCourse] = useState<CourseType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [subjects, setSubjects] = useState<SubjectType[]>([]);
  const [grades, setGrades] = useState<GradeType[]>([]);
  const [section, setSection] = useState<SectionType | null>(null);

  useEffect(() => {
    document.title = "Grades | DHVSU E-Learning Hub";
  }, []);

  useEffect(() => {
    async function initialize() {
      setIsLoading(true); // Start loading
      setSubjects([]);
      setGrades([]);
      setSection(null);
      try {
        const res = await fetch("/api/courses");
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();

        const sectionRes = await fetch(
          `/api/sections/${user_creds.section_id}`
        );
        if (!sectionRes.ok) throw new Error("Failed to fetch section");
        const sectionData = await sectionRes.json();

        const gradesRes = await fetch("/api/grades/student", {
          method: "post",
          body: JSON.stringify({ id: user.user.id }),
        });
        if (!gradesRes.ok) throw new Error("Failed to fetch grades");
        const gradesData = await gradesRes.json();

        console.log(gradesData.studentGrades);

        setGrades(gradesData.studentGrades);

        data.forEach((course: CourseType) => {
          if (course.id === sectionData.section.course_id) {
            setCourse(course);
            return;
          }
        });

        setSection(sectionData.section);

        sectionData.section.subjects.forEach(async (subjectId: number) => {
          try {
            const subjectRes = await fetch(`/api/subjects/${subjectId}`);
            if (!subjectRes) throw new Error("Failed to fetch subject");
            const subjectData = await subjectRes.json();

            if (subjectId === subjectData.subject.id) {
              setSubjects((e) => [...e, subjectData.subject]);
            }
          } catch (error) {
            console.log(error);
          }
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    initialize();
  }, []);

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

  const getGrade = (subjectId: number): number | null => {
    const gradeEntry = grades.find((grade) => grade.subject_id === subjectId);
    return gradeEntry ? gradeEntry.grade : null;
  };

  if (isLoading) return <LoadingSpinner loading={true} />;

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
          {`${user.user_creds.ln}, ${user.user_creds.fn} ${
            course?.course_name ? "- " + course.course_name : ""
          }`}
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
                <th className="border px-4 py-2 rounded-r-lg">Remarks</th>
              </tr>
            </thead>
            <tbody className="text-brand">
              {subjects.map((subject, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-4 py-2 rounded-l-lg">{index + 1}</td>
                  <td className="border px-4 py-2">{subject.subject_code}</td>
                  <td className="border px-4 py-2">{subject.subject_name}</td>
                  <td className="border px-4 py-2">
                    {subject.type === "core"
                      ? "3"
                      : subject.type === "minor"
                      ? "2"
                      : ""}
                  </td>
                  <td className="border px-4 py-2">
                    {course?.course_code! + section?.name!}
                  </td>
                  <td className="border px-4 py-2 font-bold">
                    {getGrade(subject.id) || ""}
                  </td>
                  <td
                    className={`border px-4 py-2 font-bold ${getRemarksColor(
                      getGrade(subject.id)
                    )} rounded-r-lg`}
                  >
                    {getRemarks(getGrade(subject.id))}
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
