import { useEffect, useState } from "react";
import SubjectCard from "@/components/SubjectCard";
import Task from "@/components/Task";
import { Link } from "react-router-dom";
import { Notification } from "@/components/SlideInNotifications";
import {
  CourseType,
  SectionType,
  StudentCreds,
  SubjectType,
  TeacherCreds,
  UsersType,
} from "@/lib/types";
import LoadingSpinner from "@/components/LoadingSpinner";
import { AnimatePresence } from "framer-motion";

type SubjType = {
  id: number;
  subject: SubjectType;
  teacher: TeacherCreds | null;
  section: SectionType;
  course: CourseType;
};

type ActivityDeadline = {
  id: number;
  subject_code: string;
  title: string;
  description: string | null;
  deadline: Date;
  teacher_profile: string | null;
  teacher_profile_fallback: string;
  course_section?: string;
};

type PropType = {
  user: UsersType;
  token: string;
};

const Index = ({ user, token }: PropType) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [subjects, setSubjects] = useState<SubjType[]>([]);
  const [dueActivities, setDueActivities] = useState<ActivityDeadline[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<
    { id: number; successMessage: string }[]
  >([]);

  const tasksPerPage = 3;

  useEffect(() => {
    document.title = "Subjects | DHVSU E-Learning Hub";
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setSubjects([]);
      setDueActivities([]);
      setErrors([]);
      try {
        if (user.user.user_type === "S") {
          await fetchStudentData();
        } else if (user.user.user_type === "T") {
          await fetchTeacherData();
        } else {
          addNotification("Something went wrong");
        }
      } catch (err) {
        console.error("Error loading data:", err);
        addNotification("Failed to load data.");
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

  async function fetchStudentData() {
    const { section_id } = user.user_creds as StudentCreds;
    const { activities } = user.user_creds as StudentCreds;
    const sectionData = await fetchWithErrorHandling(
      `/api/sections/${section_id}`
    );
    if (!sectionData) return;

    const subjectPromises = sectionData.section.subjects.map((id: number) =>
      fetchWithErrorHandling(`/api/subjects/${id}`)
    );
    const subjectsData = await Promise.all(subjectPromises);

    const subjectsWithDetails = await Promise.all(
      subjectsData.map(async (subject: any) => {
        const teacherData = subject.subject.teacher_id
          ? await fetchWithErrorHandling(
              `/api/teachers/${subject.subject.teacher_id}`
            )
          : null;

        const courseData = await fetchWithErrorHandling(
          `/api/courses/${sectionData.section.course_id}`
        );

        return {
          id: subject.subject.id,
          subject: subject.subject,
          teacher: teacherData ? teacherData.teacher : null,
          section: sectionData.section,
          course: courseData.course || null,
        };
      })
    );

    const activitiesDue = await Promise.all(
      subjectsData.map(async (subject: any) => {
        const classroomUploads = await Promise.all(
          subject.subject.classroom_uploads.map(async (id: number) => {
            const classroomUpload = await fetchWithErrorHandling(
              `/api/classroom-upload/${id}`
            );

            if (classroomUpload.classroom_upload.type === "activity") {
              const activityUpload = await fetchWithErrorHandling(
                `/api/activity-upload/${classroomUpload.classroom_upload.id}`
              );

              const teacherData = subject.subject.teacher_id
                ? await fetchWithErrorHandling(
                    `/api/teachers/${subject.subject.teacher_id}`
                  )
                : null;

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
                id: activityUpload.activity_upload.id,
                subject_code: subject.subject.subject_code,
                title: activityUpload.activity_upload.title,
                description: activityUpload.activity_upload.description,
                deadline: new Date(deadlineData.activity_deadline.deadline),
                teacher_profile: teacherData?.teacher?.profile_picture || null,
                teacher_profile_fallback:
                  teacherData?.teacher?.fn[0].toUpperCase() +
                  teacherData?.teacher?.ln[0].toUpperCase(),
              };
            }
            return null; // To filter out non-activity uploads later
          })
        );
        // Filter out null values
        return classroomUploads.filter((upload) => upload !== null);
      })
    );

    const activitySubmissions = await Promise.all(
      activities.map(async (existingActivity) => {
        // Fetch activity submission by ID
        const activitySubmissionData = await fetchWithErrorHandling(
          `/api/activity-submission/${existingActivity}`
        );

        // Fetch the related activity upload using the activity_upload_id
        const activityUploadData = await fetchWithErrorHandling(
          `/api/activity-upload/${activitySubmissionData.activity_submission.activity_upload_id}`
        );

        return activityUploadData.activity_upload.id; // Return the activity_upload_id
      })
    );

    // Flatten the array of arrays and filter out any potential nulls
    const flattenedActivities = activitiesDue
      .flat()
      .filter(Boolean) as ActivityDeadline[];

    // Sort the activities
    const sortedActivities = flattenedActivities
      .sort((a, b) => {
        // Check if a or b is past the deadline for non-user_type "T"
        const aIsLate = a.deadline.getTime() < Date.now();
        const bIsLate = b.deadline.getTime() < Date.now();

        // If a is late and b is not, b should come first
        if (aIsLate && !bIsLate) return 1;
        // If b is late and a is not, a should come first
        if (!aIsLate && bIsLate) return -1;

        // If both are either late or on time, sort by deadline
        return a.deadline.getTime() - b.deadline.getTime();
      })
      .filter((activity) => !activitySubmissions.includes(activity.id));

    // Update state
    setDueActivities(sortedActivities);
    setSubjects(subjectsWithDetails);
  }

  async function fetchTeacherData() {
    const { user_creds } = user;
    const { subjects } = user.user_creds as TeacherCreds;

    const subjectPromises = subjects.map((id: number) =>
      fetchWithErrorHandling(`/api/subjects/${id}`)
    );

    const subjectsData = await Promise.all(subjectPromises);
    const subjectsWithDetails = await Promise.all(
      subjectsData.map(async (subject: any) => {
        const sectionData = await fetchWithErrorHandling(
          `/api/sections/${subject.subject.section_id}`
        );

        const courseData = await fetchWithErrorHandling(
          `/api/courses/${sectionData.section.course_id}`
        );

        return {
          id: subject.subject.id,
          subject: subject.subject,
          teacher: (user.user_creds as TeacherCreds) || null,
          section: sectionData.section,
          course: courseData.course || null,
        };
      })
    );

    const activitiesDue = await Promise.all(
      subjectsData.map(async (subject: any) => {
        const classroomUploads = await Promise.all(
          subject.subject.classroom_uploads.map(async (id: number) => {
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

              const sectionData = await fetchWithErrorHandling(
                `/api/sections/${subject.subject.section_id}`
              );

              const courseData = await fetchWithErrorHandling(
                `/api/courses/${sectionData.section.course_id}`
              );

              return {
                id: activityUpload.activity_upload.id,
                subject_code: subject.subject.subject_code,
                title: activityUpload.activity_upload.title,
                description: activityUpload.activity_upload.description,
                deadline: new Date(deadlineData.activity_deadline.deadline),
                teacher_profile: user_creds.profile_picture || null,
                teacher_profile_fallback:
                  user_creds.fn[0].toUpperCase() +
                  user_creds.ln[0].toUpperCase(),
                course_section:
                  courseData.course.course_code +
                  " " +
                  sectionData.section.name,
              };
            }
            return null; // To filter out non-activity uploads later
          })
        );
        // Filter out null values
        return classroomUploads.filter((upload) => upload !== null);
      })
    );

    // Flatten the array of arrays and filter out any potential nulls
    const flattenedActivities = activitiesDue
      .flat()
      .filter(Boolean) as ActivityDeadline[];

    // Sort the activities
    const sortedActivities = flattenedActivities
      .sort((a, b) => a.deadline.getTime() - b.deadline.getTime())
      .filter(
        (activity) => activity.deadline.getTime() > Date.now() // Keep only activities that are not past the deadline
      );

    // Update state
    setDueActivities(sortedActivities);
    setSubjects(subjectsWithDetails);
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

  function addNotification(message: string) {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, successMessage: message }]);
  }

  function removeNotification(id: number) {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }

  const handleNext = () => {
    if (currentIndex + tasksPerPage < dueActivities.length) {
      setCurrentIndex(currentIndex + tasksPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - tasksPerPage >= 0) {
      setCurrentIndex(currentIndex - tasksPerPage);
    }
  };

  if (isLoading) return <LoadingSpinner loading={true} />;

  return (
    <>
      <div className="p-5">
        {dueActivities.length ? (
          <>
            <div className="flex flex-col w-full  bg-[#F7F1EF] shadow-md rounded-[20px] py-5 mt-4">
              <div className="flex items-center justify-between w-full">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="flex items-center pr-2 hover:bg-white transition-all duration-300 py-20 rounded-r-lg hover:text-DHVSU-red"
                >
                  <div className="text-brand pl-2 lg:pr-2 lg:pl-3 focus:outline-none z-10 py-0 px-0 h-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </div>
                </button>

                <div className="overflow-hidden w-full mx-0">
                  <div className="flex transition-transform duration-500 h-56 md:h-60 lg:h-64 w-full">
                    {dueActivities
                      .slice(currentIndex, currentIndex + tasksPerPage)
                      .map((activity) => (
                        <Task
                          key={activity.id}
                          id={activity.id}
                          subject_code={activity.subject_code}
                          title={activity.title}
                          description={activity.description}
                          due_date={activity.deadline}
                          teacher_profile={activity.teacher_profile}
                          teacher_profile_fallback={
                            activity.teacher_profile_fallback
                          }
                          course_section={activity.course_section}
                          user_type={user.user.user_type}
                        />
                      ))}
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  disabled={currentIndex + tasksPerPage >= dueActivities.length}
                  className="flex items-center pl-2 hover:bg-white transition-all duration-300 py-20 rounded-l-lg hover:text-DHVSU-red"
                >
                  <div className="text-brand pr-2 lg:pr-3 lg:pl-2 focus:outline-none z-10 py-0 px-0 h-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </>
        ) : null}

        <div className="text-lg font-bold text-left text-brand py-6 pl-6 pt-10 pb-2 lg:px-14">
          Subjects
        </div>

        <div id="course-content" className="p-6 pt-1 lg:px-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {subjects.map((subject) => (
              <Link
                key={subject.id}
                to={`/user/subjects/${subject.id}`}
                className="block"
              >
                <SubjectCard
                  id={subject.id}
                  subject={subject.subject}
                  teacher={subject.teacher}
                  section={subject.section}
                  course={subject.course}
                />
              </Link>
            ))}
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

export default Index;
