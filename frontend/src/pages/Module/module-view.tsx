import { Separator } from "@/components/ui/separator";
import { ModuleType } from "@/lib/types";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Notification } from "@/components/SlideInNotifications";
import { useParams } from "react-router-dom";
import LoadingSpinner from "@/components/LoadingSpinner";
import { formatDateTime, getFileExtension, truncateLink } from "@/lib/utils";
import { FileText } from "lucide-react";

const ModuleView = () => {
  const { id } = useParams();
  const [module, setModule] = useState<ModuleType | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<
    { id: number; successMessage: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getModule();
  }, []);

  useEffect(() => {
    if (errors.length > 0) {
      errors.forEach((e) => {
        addNotification(e);
      });
    }
  }, [errors]);

  async function getModule() {
    setModule(null);
    setErrors([]);
    setIsLoading(true);
    try {
      const moduleData = await fetchWithErrorHandling(`/api/modules/${id}`);
      setModule(moduleData.module);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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

  if (isLoading) return <LoadingSpinner loading={true} />;

  return (
    <>
      <div className="p-6">
        <div className="mb-4">
          <h1 className="text-dhvsu text-4xl font-bold">{module?.title}</h1>
          <p className="text-md text-gray-500">
            {formatDateTime(module?.created_at!)}
          </p>
        </div>
        <Separator className="mb-2" />
        <div>
          <span>{module?.description}</span>
        </div>
        <br />
        <br />
        <div>
          <h3>
            <b>Attachments</b>
          </h3>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            {module?.attachments.length &&
              module?.attachments.map((link, i) => (
                <div className="border border-gray-200 flex rounded-lg items-center w-[250px] max-w-[250px]">
                  <div className="p-2 border-r border-gray-200" key={i}>
                    <FileText size={36} />
                  </div>
                  <div className="p-2">
                    <a
                      href={link}
                      target="_blank"
                      className="font-semibold hover:underline"
                    >
                      {truncateLink(link)}
                    </a>
                    <p className="text-gray-400">
                      {getFileExtension(link)?.toUpperCase()}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
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

export default ModuleView;
