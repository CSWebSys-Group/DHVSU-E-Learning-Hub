import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  FileText,
  LoaderCircle,
  Plus,
  Upload,
  X,
} from "lucide-react";

import { useState, useRef, useEffect, FormEvent, ChangeEvent } from "react";

import { Notification } from "@/components/SlideInNotifications";

import { motion, AnimatePresence } from "framer-motion";
import { cn, formatDate, formatDateTime, isPastDeadline } from "@/lib/utils";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { Link, useParams } from "react-router-dom";
import {
  ActivityDeadlineType,
  ActivitySubmissionType,
  ActivityUploadType,
  SubjectType,
  TeacherCreds,
  UsersType,
} from "@/lib/types";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ImageConfig } from "@/config/ImageConfig";

type PropType = {
  user: UsersType;
  token: string;
};

type FileStateType = { name: string; type: string };

const SubjectTask = ({ user, token }: PropType) => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState<TeacherCreds | null>(null);
  const [subject, setSubject] = useState<SubjectType | null>(null);
  const [activity, setActivity] = useState<ActivityUploadType | null>(null);
  const [deadline, setDeadline] = useState<ActivityDeadlineType | null>(null);
  const [submittedActivity, setSubmittedActivity] =
    useState<ActivitySubmissionType | null>(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<
    { id: number; successMessage: string }[]
  >([]);
  const [errors, setErrors] = useState<string[]>([]);

  const [files, setFiles] = useState<File[]>([]);
  const [filesDisplay, setFilesDisplay] = useState<FileStateType[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setSubject(null);
      setActivity(null);
      setDeadline(null);
      setTeacher(null);
      setSubmittedActivity(null);
      setErrors([]);
      try {
        await fetchData();
      } catch (error) {
        console.log(error);
        addNotification("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  async function fetchData() {
    const classroomUpload = await fetchWithErrorHandling(
      `/api/classroom-upload/${id}`
    );
    const subjectData = await fetchWithErrorHandling(
      `/api/subjects/${classroomUpload.classroom_upload.subject_id}`
    );
    const teacherData = await fetchWithErrorHandling(
      `/api/teachers/${subjectData.subject.teacher_id}`
    );
    const activityUpload = await fetchWithErrorHandling(
      `/api/activity-upload/${id}`
    );
    const deadlineData = await fetchWithErrorHandling(
      `/api/get-activity-deadline`,
      {
        method: "post",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          id: activityUpload.activity_upload.deadline_id,
        }),
      }
    );
    const submittedActivityData = await fetchWithErrorHandling(
      `/api/get-student-submission`,
      {
        method: "post",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          student_id: user.user.id,
          activity_upload_id: id,
        }),
      }
    );

    setSubject(subjectData.subject);
    setTeacher(teacherData.teacher);
    setActivity(activityUpload.activity_upload);
    setDeadline(deadlineData.activity_deadline);
    setSubmittedActivity(
      submittedActivityData.studentSubmission
        ? submittedActivityData.studentSubmission
        : null
    );
  }

  // Handle file input changes
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (!event.target.files) return;

    const selectedFiles = Array.from(event.target.files);

    // Create display state for the selected files
    const newDisplayFiles: FileStateType[] = selectedFiles.map((file) => ({
      name: file.name,
      type: file.type.split("/")[1].toUpperCase(),
    }));

    // Update both states
    setFiles((prev) => [...prev, ...selectedFiles]);
    setFilesDisplay((prev) => [...prev, ...newDisplayFiles]);
    setOpen(false);
  };

  // Remove a file by index
  const handleRemoveFile = (index: number): void => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFilesDisplay((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const submissionData = {
      student_id: user.user.id,
      activity_upload_id: activity?.id!,
      files,
    };

    const formData = new FormData();
    files.forEach((file) => formData.append("files[]", file));

    formData.append("student_id", submissionData.student_id.toString());
    formData.append(
      "activity_upload_id",
      submissionData.activity_upload_id.toString()
    );

    try {
      const activitySubmissionData = await fetchWithErrorHandling(
        `http://127.0.0.1:8000/api/activity-submission`,
        {
          method: "post",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      if (activitySubmissionData) window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  async function fetchWithErrorHandling(url: string, headers: any = {}) {
    try {
      const res = await fetch(url, headers);
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

  function getFileExtension(url: string): string | null {
    const match = url.match(/\.([a-zA-Z0-9]+)$/);
    return match ? match[1] : null;
  }

  // Map file types to display icons
  const getFileDisplayIcon = (type: string) => {
    if (type.includes("jpg")) return ImageConfig.jpg;
    if (type.includes("pdf")) return ImageConfig.pdf;
    if (type.includes("txt")) return ImageConfig.txt;
    if (type.includes("png")) return ImageConfig.png;
    if (type.includes("docx")) return ImageConfig.docx;
    return type;
  };

  function truncateLink(link: string) {
    const lastPart = link.split("/").pop();
    return lastPart!.length > 30
      ? lastPart!.substring(0, 30) + "..."
      : lastPart;
  }

  if (isLoading) return <LoadingSpinner loading={true} />;

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6 justify-between relative">
      {/* Display activity */}
      <div className="w-full">
        <div className="flex align-center flex-col">
          <h2 className="text-3xl font-bold mb-2">{activity?.title}</h2>
          <Link className="pb-1" to={`/user/subjects/${subject?.id}`}>
            <b>{subject?.subject_code}</b>
          </Link>
        </div>
        <p className="flex items-center gap-2 text-md text-gray-400 mb-2">
          {teacher?.fn} {teacher?.ln}
          <div className="w-1 h-1 bg-gray-400 rounded-full" />{" "}
          {formatDate(new Date())}
          {user.user.user_type === "T" && (
            <Link
              to={`/user/activities/${activity?.id}/submissions`}
              className="my-2 py-2 text-white font-semibold px-[10px] rounded-lg flex items-center gap-2 bg-brand ml-auto"
            >
              <div className="flex items-center gap-2 space-x-4 bg-white text-brand font-bold py-1 px-4 rounded-md">
                Submissions
              </div>
            </Link>
          )}
        </p>

        <div className="flex justify-between mb-4">
          <p>
            <span className="font-semibold">
              {submittedActivity ? submittedActivity.score : "_ "}
            </span>
            /{activity?.total_score}
          </p>
          {deadline && (
            <p className="text-gray-500 font-semibold">
              Due {formatDateTime(deadline.deadline)}
            </p>
          )}
        </div>
        <Separator className="bg-gray-300" />
        <div>{activity?.description && activity.description}</div>
        <br />
        <br />
        <br />
        <br />
        <div>
          <h3>
            <b>Attachments</b>
          </h3>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            {activity?.attachments.length &&
              activity?.attachments.map((link, i) => (
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

      {/* Submitting activities UI */}
      {user.user.user_type === "S" && (
        <>
          <div className="shadow-drop-1 p-5 rounded-lg w-full md:w-[450px]">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-semibold">Your work</h2>
              {submittedActivity && submittedActivity.score !== null && (
                <p className="bg-green-100 px-2 py-2 rounded-md flex items-center gap-1.5 font-semibold text-sm">
                  {" "}
                  <CheckCircle2 color="green" size={18} /> Graded
                </p>
              )}
            </div>

            {/* File display */}
            {!submittedActivity && filesDisplay.length > 0 ? (
              <div className="flex flex-col gap-2 mb-4">
                {filesDisplay.map((file, index) => (
                  <div
                    className="border border-gray-200 flex rounded-lg items-center"
                    key={index}
                  >
                    <div className=" p-2 border-r border-gray-200">
                      <FileText size={36} />
                    </div>
                    <div className="p-2">
                      <span className="font-semibold">{file.name}</span>
                      <p className="text-gray-400">{file.type}</p>
                    </div>
                    <X
                      className="ml-auto mr-4 cursor-pointer"
                      size={18}
                      onClick={() => handleRemoveFile(index)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}

            {submittedActivity && (
              <div className="flex flex-col gap-2 mb-4">
                {submittedActivity.attachments.map((file, index) => (
                  <a
                    href={file}
                    target="_blank"
                    className="border border-gray-200 flex rounded-lg items-center"
                    key={index}
                  >
                    <div className=" p-2 border-r border-gray-200">
                      <img
                        src={getFileDisplayIcon(getFileExtension(file)!) || ""}
                        alt={file}
                        width={35}
                        height={35}
                      />
                    </div>
                    <div className="p-2">
                      <span className="font-semibold">
                        {file.split("/").pop()}
                      </span>
                      <p className="text-gray-400">{file.split("/").pop()}</p>
                    </div>
                  </a>
                ))}
              </div>
            )}

            <form className="flex flex-col gap-2 mb-4" onSubmit={handleSubmit}>
              <Button
                type="button"
                className="uploader-button w-full"
                onClick={() => setOpen(true)}
                disabled={
                  submittedActivity !== null ||
                  (!isPastDeadline(deadline?.deadline!) ? submitting : true)
                }
              >
                <Plus />
                Add
              </Button>
              <Button
                type="submit"
                className="outline-btn w-full"
                disabled={
                  submittedActivity !== null ||
                  (!isPastDeadline(deadline?.deadline!) ? submitting : true)
                }
              >
                {isLoading ? "Submitting..." : "Submit"}
                {isLoading && (
                  <LoaderCircle size={24} className="ml-2 animate-spin" />
                )}
              </Button>
            </form>

            <div>
              <p
                className={`${
                  isPastDeadline(deadline?.deadline!) ? "font-bold" : ""
                } italic text-${
                  isPastDeadline(deadline?.deadline!) ? "red" : "gray"
                }-500 text-sm text-center`}
              >
                Work cannot be turned in after the due date
              </p>
            </div>
          </div>
          <ActivityUploadModal open={open} setOpen={setOpen}>
            <div className="mb-5">
              <div className="border-4 border-dashed rounded-lg relative overflow-hidden p-15 flex items-center justify-center mx-5 h-[250px]">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="absolute w-full h-full top-0 left: 0; opacity-0 cursor-pointer"
                />
                <Upload className="mr-4" />
                <h4 className="font-bold text-xl">Choose a file to submit</h4>
              </div>
            </div>
          </ActivityUploadModal>

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
      )}
    </div>
  );
};

const ActivityUploadModal = ({
  children,
  className,
  open,
  setOpen,
}: {
  children?: React.ReactNode;
  className?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const modalRef = useRef(null);
  useOutsideClick(modalRef, () => setOpen(false));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            backdropFilter: "blur(10px)",
          }}
          exit={{
            opacity: 0,
            backdropFilter: "blur(0px)",
          }}
          className="fixed [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full flex items-center justify-center z-50"
        >
          <Overlay />

          <motion.div
            ref={modalRef}
            className={cn(
              "min-h-[50%] max-h-[90%] md:max-w-[40%] bg-white dark:bg-neutral-950 border border-transparent dark:border-neutral-800 md:rounded-2xl relative z-50 flex flex-col flex-1 overflow-hidden justify-center",
              className
            )}
            initial={{
              opacity: 0,
              scale: 0.5,
              rotateX: 40,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: 0,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              rotateX: 10,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 15,
            }}
          >
            <CloseIcon setOpen={setOpen} />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Overlay = ({ className }: { className?: string }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        backdropFilter: "blur(10px)",
      }}
      exit={{
        opacity: 0,
        backdropFilter: "blur(0px)",
      }}
      className={`fixed inset-0 h-full w-full bg-black bg-opacity-50 z-50 ${className}`}
    ></motion.div>
  );
};

const CloseIcon = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      onClick={() => setOpen(false)}
      className="absolute top-4 right-4 group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-black dark:text-white h-4 w-4 group-hover:scale-125 group-hover:rotate-3 transition duration-200"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </svg>
    </button>
  );
};

export default SubjectTask;
