import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Notification } from "@/components/SlideInNotifications";
import { SubjectType, UsersType } from "@/lib/types";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Separator } from "@radix-ui/react-select";
import { JitsiMeeting } from "@jitsi/react-sdk";

export default function Meeting({ user }: { user: UsersType }) {
  const { id } = useParams();
  const [roomName, setRoomName] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<
    {
      id: number;
      successMessage: string;
    }[]
  >([]);
  const [subject, setSubject] = useState<SubjectType | null>(null);

  useEffect(() => {
    fetchRoomName();
  }, []);

  useEffect(() => {
    if (errors.length > 0) {
      errors.forEach(addNotification);
    }
  }, [errors]);

  const fetchRoomName = async () => {
    setIsLoading(true);
    try {
      const subjectData = await fetchWithErrorHandling(`/api/subjects/${id}`);
      setSubject(subjectData.subject);
      setRoomName(generateRoomName(subjectData));
    } catch (error) {
      console.error("Error fetching room name:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateRoomName = (subjectData: any) => {
    if (!subjectData?.subject) return "default-room";
    const { id } = subjectData.subject;
    return `room-meet-${id}`;
  };

  const fetchWithErrorHandling = async (url: string) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) {
        handleApiErrors(data);
        return null;
      }
      return data;
    } catch (err) {
      console.error("Fetch error:", err);
      addNotification("An error occurred while fetching data.");
      return null;
    }
  };

  const handleApiErrors = (data: any) => {
    const errorMessages = data.errors
      ? Object.values(data.errors).flat()
      : ["Something went wrong"];
    setErrors((prev: any) => [...prev, ...errorMessages]);
  };

  const addNotification = (message: string) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, successMessage: message }]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  if (isLoading || !roomName) return <LoadingSpinner loading={true} />;

  return (
    <>
      <div className="p-6">
        <div className="mb-4">
          <h1 className="text-dhvsu text-4xl font-bold">Meeting</h1>
          <p className="text-md text-gray-500">{subject?.subject_code}</p>
        </div>
        <Separator className="mb-2" />
        <div>
          <JitsiMeeting
            domain="meet.jit.si"
            roomName={roomName}
            configOverwrite={{
              startWithAudioMuted: true,
              disableModeratorIndicator: true,
              startScreenSharing: true,
              enableEmailInStats: false,
            }}
            interfaceConfigOverwrite={{
              DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
            }}
            getIFrameRef={(iframeRef) => {
              iframeRef.style.height = "80vh";
            }}
          />
        </div>
      </div>

      <div>
        <AnimatePresence>
          {notifications.map((notif) => (
            <Notification
              key={notif.id}
              id={notif.id}
              successMessage={notif.successMessage}
              removeNotif={removeNotification}
            />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
