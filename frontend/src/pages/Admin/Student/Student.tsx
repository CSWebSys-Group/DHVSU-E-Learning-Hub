import { useState, useEffect } from "react";

import { StudentTable, columns } from "./columns";
import { DataTable } from "../../../components/ui/table/data-table";
import { Notification } from "@/components/SlideInNotifications";
import { useSearchParams } from "react-router-dom";
import StudentTableActions from "./student-table-action";
import { AnimatePresence } from "framer-motion";
import { StudentCreds } from "@/lib/types";
import LoadingSpinner from "@/components/LoadingSpinner";

const Student = () => {
  const [data, setData] = useState<StudentTable[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<
    { id: number; successMessage: string }[]
  >([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const [isLoading, setIsLoading] = useState(true);

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

  async function getData(searchTerm: string = ""): Promise<StudentTable[]> {
    try {
      setData([]);
      // Fetch students data
      const studentsData = await fetchWithErrorHandling("/api/students");

      if (!studentsData) return []; // Handle case where no data is returned

      // Fetch related data for each student
      const allData = await Promise.all(
        studentsData.map(async (student: StudentCreds) => {
          if (student.section_id) {
            // Fetch section data
            const sectionData = await fetchWithErrorHandling(
              `/api/sections/${student.section_id}`
            );
            if (!sectionData) return null;

            // Fetch course data
            const courseData = await fetchWithErrorHandling(
              `/api/courses/${sectionData.section.course_id}`
            );
            if (!courseData) return null;

            // Return the combined data
            return {
              id: student.id,
              name: `${student.fn}, ${student.ln}`,
              type: "student",
              year_section: `${courseData.course.course_code} ${sectionData.section.name}`,
            };
          } else {
            return {
              id: student.id,
              name: `${student.fn}, ${student.ln}`,
              type: "student",
              year_section: "",
            };
          }
        })
      );

      // Filter out any null values (in case of failed fetches)
      const resolvedData = allData.filter((item) => item !== null);

      // Apply search term filtering if provided
      if (searchTerm) {
        return resolvedData.filter(
          (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.year_section.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      return resolvedData;
    } catch (error) {
      console.error("Error in getData:", error);
      return [];
    }
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
          <h2 className="text-3xl tracking-tight text-dhvsu">Students</h2>
        </div>
        <StudentTableActions />
        {isLoading ? (
          <LoadingSpinner loading={true} />
        ) : (
          <DataTable
            columns={columns}
            hasLinks={true}
            type="students"
            data={data}
          />
        )}
      </div>
      <div>
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

export default Student;
