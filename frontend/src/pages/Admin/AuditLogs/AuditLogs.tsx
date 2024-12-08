import { useState, useEffect } from "react";
import { type AuditLog, columns } from "./columns";
import { DataTable } from "../../../components/ui/table/data-table";
import { useSearchParams } from "react-router-dom";
import AuditLogsAction from "./audit-logs-action";
import { AnimatePresence } from "framer-motion";
import { Notification } from "@/components/SlideInNotifications";
import { AuditLogType } from "@/lib/types";

const AuditLogs = () => {
  const [data, setData] = useState<AuditLog[]>([]);
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

  async function getData(searchTerm: string = ""): Promise<AuditLog[]> {
    setData([]);
    const allAuditLogsData = await fetchWithErrorHandling("/api/audit-logs");

    console.log(allAuditLogsData);

    const allAuditLogs: AuditLog[] = allAuditLogsData.map(
      (audit_log: AuditLogType) => ({
        id: audit_log.id,
        description: audit_log.description,
        type:
          audit_log.user_type === "A"
            ? "Admin"
            : audit_log.user_type === "S"
            ? "Student"
            : "Teacher",
        created_at: parseDate(audit_log.created_at),
        time: parseTime(audit_log.created_at),
      })
    );

    if (searchTerm) {
      return allAuditLogs.filter(
        (item) =>
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.time
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return allAuditLogs;
  }

  function parseDate(date: string | Date): string {
    // Ensure the input is a Date object
    const parsedDate = typeof date === "string" ? new Date(date) : date;

    const year = parsedDate.getFullYear();
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based
    const day = parsedDate.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function parseTime(date: string | Date): string {
    const parsedDate = typeof date === "string" ? new Date(date) : date;

    let hours = parsedDate.getHours();
    const minutes = parsedDate.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12 || 12; // Convert "0" hours (midnight) to "12"
    const formattedHours = hours.toString().padStart(2, "0"); // Pad single-digit hours

    return `${formattedHours}:${minutes} ${period}`;
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
        <AuditLogsAction />
        <DataTable
          columns={columns}
          type="audit-logs"
          hasLinks={false}
          data={data}
        />
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

export default AuditLogs;
