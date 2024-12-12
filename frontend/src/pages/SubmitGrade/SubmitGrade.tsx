import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { SubjectType } from "@/lib/types";
import { AnimatePresence } from "framer-motion";
import { Notification } from "@/components/SlideInNotifications";
import { useParams } from "react-router-dom";
import LoadingSpinner from "@/components/LoadingSpinner";

type StudentDisplayType = {
  id: number;
  avatarUrl: string; // avatar student url fetch
  email: string;
  fn: string;
  ln: string;
  grade: number | null;
};

const SubmitGrade = ({ token }: { token: string }) => {
  const { id } = useParams();
  const [students, setStudents] = useState<StudentDisplayType[]>([]);
  const [subject, setSubject] = useState<SubjectType | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<
    { id: number; successMessage: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (errors.length > 0) {
      errors.forEach((e) => {
        addNotification(e);
      });
    }
  }, [errors]);

  async function fetchData() {
    setErrors([]);
    setStudents([]);
    setSubject(null);
    setIsLoading(true);

    try {
      const subjectData = await fetchWithErrorHandling(`/api/subjects/${id}`);
      const sectionData = await fetchWithErrorHandling(
        `/api/sections/${subjectData.subject.section_id}`
      );

      const allStudentsInSection = await Promise.all(
        sectionData.section.students.map(async (student_id: number) => {
          const studentData = await fetchWithErrorHandling(
            `/api/students/${student_id}`
          );
          const userData = await fetchWithErrorHandling(
            `/api/users/${student_id}`
          );
          const studentGrade = await fetchWithErrorHandling(
            "/api/find-student-grade",
            {
              method: "post",
              headers: { Authorization: `Bearer ${token}` },
              body: JSON.stringify({
                student_id,
                subject_id: subjectData.subject.id,
              }),
            }
          );
          return {
            id: student_id,
            avatarUrl: studentData.student.profile_picture,
            email: userData.user.email,
            fn: studentData.student.fn,
            ln: studentData.student.ln,
            grade:
              studentGrade.grade !== null
                ? studentGrade.grade.grade
                : studentGrade.grade,
          };
        })
      );

      setStudents(allStudentsInSection);
      setSubject(subjectData.subject);
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
      <div className="h-full p-10">
        <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle className="text-2xl text-dhvsu font-bold">
                    CSOS 313
                  </CardTitle>
                  <CardDescription>Operating Systems</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      {/* Table titles */}
                      <TableRow>
                        <TableHead className="hidden md:table-cell">
                          Profile
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Email
                        </TableHead>
                        <TableHead>Full Name</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Grade
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.length > 0 &&
                        students.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="hidden sm:table-cell">
                              <Avatar>
                                <AvatarImage src={student.avatarUrl} />
                                <AvatarFallback>
                                  {student.fn[0].toUpperCase()}
                                  {student.ln[0].toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                            </TableCell>
                            <TableCell className="font-medium">
                              {student.email}
                            </TableCell>
                            <TableCell className="font-medium">
                              {student.ln} {student.fn}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <GradeForm
                                student={student}
                                subjectId={subject?.id!}
                                fetchWithErrorHandling={fetchWithErrorHandling}
                                token={token}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1</strong> of{" "}
                    <strong>{students.length}</strong> Students
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
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

const GradeForm = ({
  student,
  subjectId,
  fetchWithErrorHandling,
  token,
}: {
  student: StudentDisplayType;
  subjectId: number;
  fetchWithErrorHandling: (url: string, headers?: any) => Promise<any>;
  token: string;
}) => {
  // Initialize the state for the score value
  const [grade, setGrade] = useState<string>(
    student.grade ? String(student.grade) : ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [graded, setGraded] = useState(student.grade !== null);

  const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Regex to match numbers from 1 to 5 with up to 1 decimal place
    const isValid = /^(([1-4](\.\d)?)|5)?$/.test(inputValue);

    if (!isValid) return;

    const newGrade = e.target.value;
    setGrade(newGrade); // Update the state with the new value
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // Prevent default form submission (refresh)
    if (grade === "") return;
    try {
      setIsLoading(true);
      const gradedData = await fetchWithErrorHandling(`/api/grade-student`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: student.id,
          subject_id: subjectId,
          grade: Number(grade),
        }),
      });

      if (gradedData) setGraded(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-10">
      <div>
        <input
          type="number" // Changed type to "number" for consistency
          className="border-b-2 border-black w-10"
          value={grade} // Controlled value with state
          disabled={graded || isLoading}
          onChange={handleGradeChange}
          name="score"
        />
      </div>
      <Button className="bg-dhvsu" type="submit" disabled={graded || isLoading}>
        {isLoading ? "Grading..." : "Grade"}
      </Button>
    </form>
  );
};

export default SubmitGrade;
