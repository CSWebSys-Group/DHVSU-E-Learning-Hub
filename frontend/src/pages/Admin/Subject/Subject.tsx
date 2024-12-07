import { useState, useEffect } from "react";

import { SubjectTable, columns } from "./columns";
import { DataTable } from "../../../components/ui/table/data-table";
import { Notification } from "@/components/SlideInNotifications";

import { useSearchParams } from "react-router-dom";
import SubjectTableActions from "./subject-table-actions";
import { AnimatePresence } from "framer-motion";
import {
  CourseType,
  SectionType,
  SubjectType,
  TeacherCreds,
} from "@/lib/types";
import LoadingSpinner from "@/components/LoadingSpinner";

const Subject = ({ token }: { token: string }) => {
  const [data, setData] = useState<SubjectTable[]>([]);
  const [allSubjects, setAllSubjects] = useState<SubjectType[]>([]);
  const [allCourses, setAllCourses] = useState<CourseType[]>([]);
  const [allSections, setAllSections] = useState<SectionType[]>([]);
  const [allTeachers, setAllTeachers] = useState<TeacherCreds[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<
    { id: number; successMessage: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      setAllSubjects([]);
      setAllCourses([]);
      setAllSections([]);
      setAllTeachers([]);
      setErrors([]);
      try {
        const allSubjects = await fetchWithErrorHandling("/api/subjects");
        const allCourses = await fetchWithErrorHandling("/api/courses");
        const allSections = await fetchWithErrorHandling("/api/sections");
        const allTeachers = await fetchWithErrorHandling("/api/teachers");

        setAllSubjects(allSubjects);
        setAllCourses(allCourses);
        setAllSections(allSections);
        setAllTeachers(allTeachers);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    initializeData();
  }, []);

  useEffect(() => {
    if (errors.length > 0) {
      errors.forEach((e) => {
        addNotification(e);
      });
    }
  }, [errors]);

  useEffect(() => {
    setIsLoading(true); // Set loading state to true before fetching data
    getData(search)
      .then((fetchedData) => setData(fetchedData))
      .finally(() => setIsLoading(false)); // Ensure loading state is false after fetching
  }, [search]);

  async function getData(searchTerm: string = ""): Promise<SubjectTable[]> {
    setData([]);
    const allSubjects = await fetchWithErrorHandling("/api/subjects");
    const allCourses = await fetchWithErrorHandling("/api/courses");
    const allSections = await fetchWithErrorHandling("/api/sections");

    const allData = await Promise.all(
      allSubjects.map(async (subject: SubjectType) => {
        const section = allSections.find(
          (s: SectionType) => s.id === subject.section_id
        ); // Match course by ID
        const course = allCourses.find(
          (c: CourseType) => c.id === section.course_id
        ); // Match course by ID

        return {
          id: subject.id,
          subjectName: subject.subject_name,
          course_section: `${course.course_code} ${section.name}`,
          code: subject.subject_code,
        };
      })
    );

    // Filter out any null values (in case of failed fetches)
    const resolvedData = allData.filter((item) => item !== null);

    if (searchTerm) {
      return resolvedData.filter(
        (item) =>
          item.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.course_section
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return allData;
  }

  async function fetchWithErrorHandling(url: string, headers: any = {}) {
    try {
      const res = await fetch(url, headers);
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
        handleApiErrors(data);
        return null;
      }
      return data;
    } catch (err) {
      console.error("Fetch error:", err);
      return null;
    }
  }

  const handleApiErrors = (data: any) => {
    let errorMessages;

    if (data.errors) {
      errorMessages = Object.values(data.errors).flat();
    } else if (data.error) {
      errorMessages = Array.isArray(data.error) ? data.error : [data.error];
    } else if (data.message) {
      errorMessages = Array.isArray(data.message)
        ? data.message
        : [data.message];
    } else {
      errorMessages = ["Something went wrong"];
    }
    setErrors((prev: any) => [...prev, ...errorMessages]);
  };

  const addNotification = (message: string) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, successMessage: message }]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <>
      <div className="container mx-auto py-10">
        <div>
          <h2 className="text-3xl tracking-tight text-dhvsu">Subjects</h2>
        </div>
        <SubjectTableActions
          fetchWithErrorHandling={fetchWithErrorHandling}
          allCourses={allCourses}
          allSections={allSections}
          allTeachers={allTeachers}
          token={token}
          setErrors={setErrors}
        />
        {isLoading ? (
          <LoadingSpinner loading={true} />
        ) : (
          <DataTable
            columns={columns}
            hasLinks={false}
            type="subjects"
            data={data}
          />
        )}
      </div>
      <div className="flex flex-col gap-1 w-72 fixed top-2 right-2 z-50 pointer-events-none">
        <AnimatePresence>
          {notifications.map((notif, i) => (
            <Notification
              key={i}
              id={notif.id}
              successMessage={notif.successMessage}
              removeNotif={removeNotification}
            />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Subject;
