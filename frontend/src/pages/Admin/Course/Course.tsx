import { useState, useEffect } from "react";

import { CourseTable, columns } from "./columns";
import { DataTable } from "../../../components/ui/table/data-table";
import { Notification } from "@/components/SlideInNotifications";
import { useSearchParams } from "react-router-dom";
import CourseTableActions from "./course-table-actions";
import { AnimatePresence } from "framer-motion";
import { CourseType } from "@/lib/types";
import LoadingSpinner from "@/components/LoadingSpinner";

const Course = ({ token }: { token: string }) => {
  const [data, setData] = useState<CourseTable[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<
    { id: number; successMessage: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

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

  async function getData(searchTerm: string = ""): Promise<CourseTable[]> {
    setData([]);
    const allCourses = await fetchWithErrorHandling("/api/courses");
    const allData = (allCourses as CourseType[]).map((c) => ({
      id: c.id,
      name: c.course_name,
      code: c.course_code,
    }));

    if (searchTerm) {
      return allData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          <h2 className="text-3xl tracking-tight text-dhvsu">Courses</h2>
        </div>
        <CourseTableActions
          token={token}
          setErrors={setErrors}
          fetchWithErrorHandling={fetchWithErrorHandling}
        />
        {isLoading ? (
          <LoadingSpinner loading={true} />
        ) : (
          <DataTable
            columns={columns}
            hasLinks={false}
            type="courses"
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

export default Course;
