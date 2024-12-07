import { useState, useEffect } from "react";

import { TeacherTable, columns } from "./columns";
import { DataTable } from "../../../components/ui/table/data-table";
import { Notification } from "@/components/SlideInNotifications";
import { useSearchParams } from "react-router-dom";
import TeacherTableActions from "./teacher-table-action";
import { TeacherCreds } from "@/lib/types";
import LoadingSpinner from "@/components/LoadingSpinner";
import { AnimatePresence } from "framer-motion";

const Teacher = () => {
  const [data, setData] = useState<TeacherTable[]>([]);
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

  async function getData(searchTerm: string = ""): Promise<TeacherTable[]> {
    try {
      // Fetch students data
      const teachersData = await fetchWithErrorHandling("/api/teachers");

      if (!teachersData) return []; // Handle case where no data is returned

      // Fetch related data for each student
      const allData = await Promise.all(
        teachersData.map(async (teacher: TeacherCreds) => {
          return {
            id: teacher.id,
            name: `${teacher.ln}, ${teacher.fn}`,
          };
        })
      );

      // Filter out any null values (in case of failed fetches)
      const resolvedData = allData.filter((item) => item !== null);

      // Apply search term filtering if provided
      if (searchTerm) {
        return resolvedData.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="container mx-auto py-1">
        <div>
          <h2 className="text-3xl tracking-tight text-dhvsu">Teachers</h2>
        </div>
        <TeacherTableActions />
        {isLoading ? (
          <LoadingSpinner loading={true} />
        ) : (
          <DataTable columns={columns} type="teachers" data={data} />
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

export default Teacher;
