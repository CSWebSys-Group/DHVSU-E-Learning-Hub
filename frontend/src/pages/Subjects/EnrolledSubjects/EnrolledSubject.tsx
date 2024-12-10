import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import {
  CourseType,
  SectionType,
  SubjectType,
  TeacherCreds,
  UsersType,
} from "@/lib/types";
import { AnimatePresence } from "framer-motion";
import { Notification } from "@/components/SlideInNotifications";
import LoadingSpinner from "@/components/LoadingSpinner";
import placeholder from "@/assets/images/placeholder-image.jpg";

type ActivityType = {
  id: number;
  title: string;
  description: string | null;
  deadline: Date;
  created_at: Date;
};

type ModuleType = {
  id: number;
  title: string;
  description: string | null;
  created_at: Date;
};

type PropType = {
  user: UsersType;
  token: string;
};

const EnrolledSubject = ({ token, user }: PropType) => {
  const { id } = useParams();
  const [subject, setSubject] = useState<SubjectType | null>(null);
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [modules, setModules] = useState<ModuleType[]>([]);
  const [teacher, setTeacher] = useState<TeacherCreds | null>(null);
  const [section, setSection] = useState<SectionType | null>(null);
  const [course, setCourse] = useState<CourseType | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<
    { id: number; successMessage: string }[]
  >([]);
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [showAllModules, setShowAllModules] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setSubject(null);
      setActivities([]);
      setModules([]);
      setTeacher(null);
      setSection(null);
      setCourse(null);
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

  useEffect(() => {
    if (errors.length > 0) {
      errors.forEach((e) => {
        addNotification(e);
      });
    }
  }, [errors]);

  const addNotification = (message: string) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, successMessage: message }]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  async function fetchData() {
    const subjectData = await fetchWithErrorHandling(`/api/subjects/${id}`);
    if (!subjectData) return;

    const activitiesData = (
      await Promise.all(
        subjectData.subject.classroom_uploads.map(async (id: number) => {
          const classroomUpload = await fetchWithErrorHandling(
            `/api/classroom-upload/${id}`
          );

          if (classroomUpload.classroom_upload.type === "activity") {
            const activityUpload = await fetchWithErrorHandling(
              `/api/activity-upload/${classroomUpload.classroom_upload.id}`
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

            return {
              id: classroomUpload.classroom_upload.id,
              title: activityUpload.activity_upload.title,
              description: activityUpload.activity_upload.description || null,
              deadline: new Date(deadlineData.activity_deadline.deadline),
              created_at: new Date(deadlineData.activity_deadline.created_at),
            };
          }
          return null;
        })
      )
    ).filter((activity) => activity !== null);

    const modulesData = (
      await Promise.all(
        subjectData.subject.classroom_uploads.map(async (id: number) => {
          const classroomUpload = await fetchWithErrorHandling(
            `/api/classroom-upload/${id}`
          );

          if (classroomUpload.classroom_upload.type === "module") {
            const moduleUpload = await fetchWithErrorHandling(
              `/api/modules/${classroomUpload.classroom_upload.id}`
            );

            return {
              id: classroomUpload.classroom_upload.id,
              title: moduleUpload.module.title,
              description: moduleUpload.module.description || null,
              created_at: new Date(moduleUpload.module.created_at),
            };
          }
          return null;
        })
      )
    ).filter((activity) => activity !== null);

    const teacherData = subjectData.subject.teacher_id
      ? await fetchWithErrorHandling(
          `/api/teachers/${subjectData.subject.teacher_id}`
        )
      : null;

    const sectionData = subjectData.subject.section_id
      ? await fetchWithErrorHandling(
          `/api/sections/${subjectData.subject.section_id}`
        )
      : null;

    const courseData = sectionData.section.course_id
      ? await fetchWithErrorHandling(
          `/api/courses/${sectionData.section.course_id}`
        )
      : null;

    const flattenedActivities = activitiesData
      .flat()
      .filter(Boolean) as ActivityType[];
    const sortedActivities = flattenedActivities.sort(
      (a, b) => b.deadline.getTime() - a.deadline.getTime()
    );

    const flattenedModules = modulesData.flat().filter(Boolean) as ModuleType[];
    const sortedModules = flattenedModules.sort(
      (a, b) => b.created_at.getTime() - a.created_at.getTime()
    );

    setActivities(sortedActivities);
    setSubject(subjectData.subject);
    setModules(sortedModules);
    setTeacher(teacherData.teacher);
    setSection(sectionData.section);
    setCourse(courseData.course);
  }

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
    const errorMessages = data.errors
      ? Object.values(data.errors).flat()
      : ["Something went wrong"];
    setErrors((prev: any) => [...prev, ...errorMessages]);
  };

  if (isLoading) return <LoadingSpinner loading={true} />;

  return (
    <>
      <div className="p-3 flex flex-col items-center justify-center mx-auto max-w-screen-xl">
        <div className="flex items-center justify-between bg-brand h-[150px] rounded-2xl w-full max-w-screen-xl p-2 md:h-[180px] shadow-md">
          <div className="left-side flex flex-col gap-1 text-white px-3">
            <h1 className="font-bold text-2xl md:text-4xl">
              {subject?.subject_code}
            </h1>
            <p className="text-sm">{subject?.subject_name}</p>
            <p className="text-sm">
              {course?.course_code + "-" + section?.name}
            </p>
            <p className="text-sm">
              {teacher?.ln.toUpperCase()}, {teacher?.fn.toUpperCase()}
            </p>
          </div>
          <div className="right-side hidden md:block">
            {teacher?.profile_picture ? (
              <img
                src={placeholder}
                alt=""
                className="bg-white rounded-full h-[70px] w-[70px] shadow-lg mr-2"
              />
            ) : (
              <span className="h-[70px] w-[70px] rounded-full border-2 border-slate-100 max-w-20 min-w-10 flex items-center justify-center bg-white text-neutral-800 text-lg mr-2">
                JP
                {/* {user.user_creds.fn[0].toUpperCase() +
                user.user_creds.ln[0].toUpperCase()} */}
              </span>
            )}
          </div>
        </div>
        {user.user.user_type === "T" && (
          <div className="flex gap-5 ml-auto">
            <Link
              to={`/user/subjects/${subject?.id}/students`}
              className="my-2 py-2 text-white font-semibold px-[10px] rounded-lg flex items-center gap-2 bg-brand ml-auto"
            >
              <div className="flex items-center gap-2 space-x-4 bg-white text-brand font-bold py-1 px-4 rounded-md">
                Students
              </div>
            </Link>
            <Link
              to={`/user/subjects/${subject?.id}/create`}
              className="my-2 py-2 text-white font-semibold px-[10px] rounded-lg flex items-center gap-2 bg-brand ml-auto"
            >
              <div className="flex items-center gap-2 space-x-4 bg-white text-brand font-bold py-1 px-4 rounded-md">
                Create
                <FaPlus />
              </div>
            </Link>
          </div>
        )}
        <div className="container-dl-resources flex flex-col md:flex-row w-full max-w-screen-xl justify-center gap-6 mx-auto">
          <div>
            <div className="bg-white rounded-xl w-full md:w-[450px] p-4 mb-6 md:mb-0 shadow-lg overflow-hidden">
              <h1 className="text-3xl font-bold text-brand">Activities</h1>
              <hr className="w-[150px] h-[5px] bg-brand" />
              {activities.slice(0, 3).map((activity) => (
                <Link to={`/user/activities/${activity.id}`} key={activity.id}>
                  <div className="border-2 text-brand border-brand rounded-md p-2 mt-2 shadow-sm hover:shadow-md hover:text-white hover:bg-brand transition">
                    <h1 className="font-bold text-lg">{activity.title}</h1>
                    <p>{activity.description}</p>
                  </div>
                </Link>
              ))}
              {showAllActivities &&
                activities.slice(3).map((activity) => (
                  <Link
                    to={`/user/activities/${activity.id}`}
                    key={activity.id}
                  >
                    <div className="border-2 text-brand border-brand rounded-md p-2 mt-2 shadow-sm hover:shadow-md hover:text-white hover:bg-brand transition">
                      <h1 className="font-bold text-lg">{activity.title}</h1>
                      {activity.description && (
                        <p>
                          {activity.description.length > 100
                            ? `${activity.description!.slice(0, 100)}...`
                            : activity.description}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              {activities.length ? (
                <div className="flex justify-center items-center text-white text-center mt-2 p-2 px-5 rounded-md font-semibold bg-brand w-[200px] mx-auto shadow-sm hover:shadow-md transition">
                  <button
                    onClick={() => setShowAllActivities(!showAllActivities)}
                  >
                    {showAllActivities ? "Show Less" : "View All"}
                  </button>
                </div>
              ) : null}
            </div>
            <div className="flex justify-between items-center mt-4 w-full md:w-auto">
              <Link
                to={`/user/subjects/${id}/meet`}
                className="bg-brand text-white py-2 px-8 font-bold rounded-md shadow-sm hover:shadow-md transition"
              >
                Join Meeting
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-md w-full md:w-[800px] p-4 shadow-lg">
            <h1 className="text-3xl font-bold text-brand">Modules</h1>
            <hr className="w-[150px] h-[5px] bg-brand" />
            {modules.slice(0, 5).map((module) => (
              <Link to={`/user/modules/${module.id}`} key={module.id}>
                <div className="mt-2 font-semibold text-lg">
                  <div className="bg-brand px-4 p-2 rounded-lg text-white shadow-sm hover:shadow-md transition">
                    {module.title}
                  </div>
                </div>
              </Link>
            ))}
            {showAllModules &&
              modules.slice(5).map((module) => (
                <Link to={`/user/modules/${module.id}`} key={module.id}>
                  <div className="mt-2 font-semibold text-lg">
                    <div className="bg-brand px-4 p-2 rounded-lg text-white shadow-sm hover:shadow-md transition">
                      {module.title}
                    </div>
                  </div>
                </Link>
              ))}
            {modules.length ? (
              <div className="flex justify-center items-center text-white text-center mt-4 p-2 px-5 rounded-md font-semibold bg-brand w-[200px] mx-auto shadow-sm hover:shadow-md transition">
                <button onClick={() => setShowAllModules(!showAllModules)}>
                  {showAllModules ? "Show Less" : "View All"}
                </button>
              </div>
            ) : null}
          </div>
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
};

export default EnrolledSubject;
