import { useState, useEffect } from "react";

import { SectionTable, columns } from "./columns";
import { DataTable } from "../../../components/ui/table/data-table";
import { Notification } from "@/components/SlideInNotifications";
import { useSearchParams } from "react-router-dom";
import SectionTableActions from "./section-table-actions";
import { AnimatePresence } from "framer-motion";
import { CourseType, SectionType } from "@/lib/types";
import LoadingSpinner from "@/components/LoadingSpinner";

const Section = ({ token }: { token: string }) => {
  const [data, setData] = useState<SectionTable[]>([]);
  const [allCourses, setAllCourses] = useState<CourseType[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<
    { id: number; successMessage: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  useEffect(() => {
    const initializeCourses = async () => {
      try {
        setAllCourses([]);
        setIsLoading(true);
        const allCoursesData = await fetchWithErrorHandling("/api/courses");
        setAllCourses(allCoursesData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    initializeCourses();
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

  async function getData(searchTerm: string = ""): Promise<SectionTable[]> {
    setData([]);
    const allSections = await fetchWithErrorHandling("/api/sections");
    // Fetch data from your API here.
    const allData = await Promise.all(
      allSections.map(async (s: SectionType) => {
        const courseData = await fetchWithErrorHandling(
          `/api/courses/${s.course_id}`
        );

        return {
          id: s.id,
          courseName: courseData.course.course_name,
          year: s.year,
          section: s.name,
        };
      })
    );

    if (searchTerm) {
      return allData.filter(
        (item) =>
          item.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.year
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item.section.toLowerCase().includes(searchTerm.toLowerCase())
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

  console.log(allCourses);

  return (
    <>
      <div className="container mx-auto py-10">
        <div>
          <h2 className="text-3xl tracking-tight text-dhvsu">Sections</h2>
        </div>
        <SectionTableActions
          token={token}
          setErrors={setErrors}
          fetchWithErrorHandling={fetchWithErrorHandling}
          allCourses={allCourses}
        />
        {isLoading ? (
          <LoadingSpinner loading={true} />
        ) : (
          <DataTable
            columns={columns}
            type="sections"
            hasLinks={false}
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

export default Section;
