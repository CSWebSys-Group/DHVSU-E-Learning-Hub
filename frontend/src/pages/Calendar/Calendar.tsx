import { useEffect, useState } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Heading } from "@/components/heading";
import { Notification } from "@/components/SlideInNotifications";
import {
  ActivityUploadType,
  StudentCreds,
  SubjectType,
  TeacherCreds,
  UsersType,
} from "@/lib/types";
import { formatDateForCalendar, formatTimeForCalendar } from "@/lib/utils";
import LoadingSpinner from "@/components/LoadingSpinner";

type Activity = {
  subject: string;
  title: string;
  date: string;
  time: string; // deadline time
};

type ActivitiesByDate = {
  [key: string]: Activity[]; // key is date string, value is array of activities for that date
};

const Calendar = ({ user, token }: { user: UsersType; token: string }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [activities, setActivities] = useState<ActivitiesByDate>({});
  const [upcomingActivities, setUpcomingActivities] =
    useState<ActivitiesByDate>({});
  const { pathname } = useLocation();
  const [errors, setErrors] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<
    { id: number; successMessage: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const todayDate = today.toISOString().split("T")[0];

  useEffect(() => {
    document.title = "Calendar | DHVSU E-Learning Hub";
  }, []);

  useEffect(() => {
    if (user.user.user_type === "S") {
      getDataForStudent();
    } else if (user.user.user_type === "T") {
      getDataForTeacher();
    }
  }, []);

  const getActivitiesForDay = (date: string): Activity[] => {
    return activities[date] || [];
  };

  const getUpcomingTaskForDay = (date: string): Activity[] => {
    return upcomingActivities[date] || [];
  };

  const handleMonthChange = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
      if (currentMonth === 0) setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
      if (currentMonth === 11) setCurrentYear((prev) => prev + 1);
    }
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  async function getDataForTeacher() {
    const user_creds = user.user_creds as TeacherCreds;
    setActivities({});
    setUpcomingActivities({});
    setIsLoading(true);
    try {
      const allSubjectsData = await Promise.all(
        user_creds.subjects.map(async (subject_id: number) => {
          const subjectData = await fetchWithErrorHandling(
            `/api/subjects/${subject_id}`
          );
          return subjectData.subject;
        })
      );

      const allActivitiesUploadData = await Promise.all(
        allSubjectsData.map(async (subject: SubjectType) => {
          const subjectActivities = await Promise.all(
            subject.classroom_uploads.map(async (cr_id: number) => {
              const classroomUpload = await fetchWithErrorHandling(
                `/api/classroom-upload/${cr_id}`
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

                const formattedDate = formatDateForCalendar(
                  deadlineData.activity_deadline.deadline
                );
                const formattedTime = formatTimeForCalendar(
                  deadlineData.activity_deadline.deadline
                );

                return {
                  subject: subject.subject_code,
                  title: activityUpload.activity_upload.title,
                  date: formattedDate,
                  time: formattedTime,
                };
              }
              return null;
            })
          );

          // Filter out null values from activities
          return subjectActivities.filter((activity) => activity !== null);
        })
      );

      // Flatten the array of activities and remove null values
      const flattenedActivities = allActivitiesUploadData
        .flat()
        .filter((activity) => activity !== null);

      // Group activities by date
      const groupedActivities: ActivitiesByDate = flattenedActivities.reduce(
        (acc, activity) => {
          const { date } = activity;
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(activity);
          return acc;
        },
        {} as ActivitiesByDate
      );

      setActivities(groupedActivities);

      // Now set the upcoming activities
      setUpcomingActivities(getUpcomingActivities(flattenedActivities));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getDataForStudent() {
    const user_creds = user.user_creds as StudentCreds;
    setActivities({});
    setUpcomingActivities({});
    setIsLoading(true);
    try {
      const sectionData = await fetchWithErrorHandling(
        `/api/sections/${user_creds.section_id}`
      );

      const allSubjectsData = await Promise.all(
        sectionData.section.subjects.map(async (subject_id: number) => {
          const subjectData = await fetchWithErrorHandling(
            `/api/subjects/${subject_id}`
          );
          return subjectData.subject;
        })
      );

      const allActivitiesUploadData = await Promise.all(
        allSubjectsData.map(async (subject: SubjectType) => {
          const subjectActivities = await Promise.all(
            subject.classroom_uploads.map(async (cr_id: number) => {
              const classroomUpload = await fetchWithErrorHandling(
                `/api/classroom-upload/${cr_id}`
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

                const formattedDate = formatDateForCalendar(
                  deadlineData.activity_deadline.deadline
                );
                const formattedTime = formatTimeForCalendar(
                  deadlineData.activity_deadline.deadline
                );

                return {
                  subject: subject.subject_code,
                  title: activityUpload.activity_upload.title,
                  date: formattedDate,
                  time: formattedTime,
                };
              }
              return null;
            })
          );

          // Filter out null values from activities
          return subjectActivities.filter((activity) => activity !== null);
        })
      );

      // Flatten the array of activities and remove null values
      const flattenedActivities = allActivitiesUploadData
        .flat()
        .filter((activity) => activity !== null);

      // Group activities by date
      const groupedActivities: ActivitiesByDate = flattenedActivities.reduce(
        (acc, activity) => {
          const { date } = activity;
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(activity);
          return acc;
        },
        {} as ActivitiesByDate
      );

      setActivities(groupedActivities);

      // Now set the upcoming activities
      setUpcomingActivities(getUpcomingActivities(flattenedActivities));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function getUpcomingActivities(activities: Activity[]) {
    const today = new Date().toISOString().split("T")[0]; // current date in 'YYYY-MM-DD' format

    // Filter activities that are after today's date
    const upcoming = activities.filter((activity) => activity.date > today);

    // Group by date
    const groupedActivities: { [key: string]: Activity[] } = upcoming.reduce(
      (acc, activity) => {
        if (!acc[activity.date]) {
          acc[activity.date] = [];
        }
        acc[activity.date].push(activity);
        return acc;
      },
      {} as { [key: string]: Activity[] } // Explicitly set the type for acc
    );

    // Return the grouped activities object instead of flattening it
    return groupedActivities;
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
      <div className="px-6 py-4">
        <Heading title="Calendar" />
      </div>
      <motion.div
        className="w-full flex flex-col items-center py-10 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className={`bg-[#F1E8E7] rounded-lg shadow-md p-6 flex flex-col ${
            pathname === "/user/calendar" ? "lg:flex-row" : "gap-6 lg:p-2"
          } space-y-6 lg:space-y-0 w-full max-w-screen-xl`}
        >
          {/* calendar */}

          <div className="flex-grow">
            <motion.div
              className="flex justify-around items-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.button
                onClick={() => handleMonthChange("prev")}
                className="flex items-center text-[#8D4A3C] font-semibold hover:underline"
                whileTap={{ scale: 0.11 }}
              >
                <MdNavigateBefore
                  className={` ${
                    pathname === "/user/calendar" ? "mr-2" : "mr-1"
                  }`}
                />
                {monthNames[(currentMonth - 1 + 12) % 12]}
              </motion.button>
              <h1
                className={`text-1xl font-bold text-[#8D4A3C] text-center ${
                  pathname === "/user/calendar" ? "" : "text-xl"
                }`}
              >
                {monthNames[currentMonth]} {currentYear}
              </h1>
              <motion.button
                onClick={() => handleMonthChange("next")}
                className="flex items-center text-[#8D4A3C] font-semibold hover:underline"
                whileTap={{ scale: 0.9 }}
              >
                {monthNames[(currentMonth + 1) % 12]}
                <MdNavigateNext
                  className={` ${
                    pathname === "/user/calendar" ? "ml-2" : "ml-1"
                  }`}
                />
              </motion.button>
            </motion.div>
            <motion.div
              className="grid grid-cols-7 gap-4 text-center text-[#8D4A3C] px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <span className="font-semibold">SUN</span>
              <span className="font-semibold">MON</span>
              <span className="font-semibold">TUE</span>
              <span className="font-semibold">WED</span>
              <span className="font-semibold">THUR</span>
              <span className="font-semibold">FRI</span>
              <span className="font-semibold">SAT</span>

              {/* calendar dates */}
              {Array.from({ length: daysInMonth }, (_, index) => {
                const day = index + 1;
                const currentDate = `${currentYear}-${(currentMonth + 1)
                  .toString()
                  .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
                const isToday = currentDate === todayDate;
                const activityForDay =
                  getActivitiesForDay(currentDate).length > 0;

                return (
                  <motion.div
                    key={day}
                    className={`cursor-pointer p-2 rounded-lg relative ${
                      isToday ? "bg-[#f1604d] text-white" : ""
                    } ${activityForDay ? "bg-[#f0b3a4]" : ""}`}
                    whileHover={{ scale: 1.1 }}
                    onMouseEnter={() => setHoveredDate(currentDate)}
                    onMouseLeave={() => setHoveredDate(null)}
                  >
                    <span className="z-0">{day}</span>

                    {hoveredDate === currentDate &&
                      activityForDay && ( //hover tassks calendar
                        <div
                          className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 text-xs text-center bg-white p-2 rounded shadow z-10"
                          style={{
                            color: isToday ? "#AC766B" : "#8D4A3C",
                            width: "max-content",
                          }}
                        >
                          {getActivitiesForDay(currentDate)[0]?.title}
                        </div>
                      )}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
          {/* actvities and upacoming tasks */}
          {(Object.keys(activities).length > 0 ||
            Object.keys(upcomingActivities).length > 0) && (
            <div className="w-full lg:w-[320px] bg-[#8D4A3C] text-white rounded-lg  p-4 space-y-6">
              <div>
                <h2 className="text-lg font-semibold">Today's Activity</h2>
                {getActivitiesForDay(todayDate).length > 0 ? (
                  <motion.div
                    className="bg-[#D98A80] p-3 rounded-lg my-2"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h3 className="font-semibold">
                      {getActivitiesForDay(todayDate)[0]?.subject}
                    </h3>
                    <p>{getActivitiesForDay(todayDate)[0]?.title}</p>
                    <p>{getActivitiesForDay(todayDate)[0]?.time}</p>
                  </motion.div>
                ) : (
                  <p>No activity for today</p>
                )}
              </div>

              <motion.div
                className="mt-4 bg-white px-2 py-2 rounded-lg"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-lg font-semibold text-brand mb-2">
                  Upcoming Activities
                </h2>
                {Object.keys(upcomingActivities).map((date, index) => {
                  const upcomingTask = getUpcomingTaskForDay(date)[0];
                  return (
                    <motion.div
                      key={index}
                      className="p-2 bg-[#BC7162] text-white rounded-lg mb-2"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.2, duration: 0.7 }}
                    >
                      <h3 className="font-semibold">{upcomingTask?.subject}</h3>
                      <p className="text-sm">{upcomingTask?.title}</p>
                      <p className="text-xs">
                        {upcomingTask?.date} at {upcomingTask?.time}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>
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

export default Calendar;
