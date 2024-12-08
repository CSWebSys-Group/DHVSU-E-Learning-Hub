import { FormEvent, useEffect, useState } from "react";

import { Heading } from "@/components/heading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { ListFilter, File, PlusCircle, MoreHorizontal } from "lucide-react";
import { MdAttachment } from "react-icons/md";
import { AnimatePresence } from "framer-motion";
import { Notification } from "@/components/SlideInNotifications";
import { formatDateTime } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";
import {
  ActivityDeadlineType,
  ActivitySubmissionType,
  ActivityUploadType,
  StudentCreds,
  SubjectType,
} from "@/lib/types";
import { boolean } from "zod";
import LoadingSpinner from "@/components/LoadingSpinner";

type LinkType = {
  url: string;
  name: string;
};

type SubmissionDisplayType = {
  id: number;
  avatarUrl: string | null;
  fn: string;
  ln: string;
  email: string;
  attachments: LinkType[];
  status: "late" | "submitted" | "not-submitted";
  score: number | null;
};

const Submissions = ({ token }: { token: string }) => {
  const { id } = useParams();
  const [submissions, setSubmissions] = useState<SubmissionDisplayType[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<
    { id: number; successMessage: string }[]
  >([]);
  const [activity, setActivity] = useState<ActivityUploadType | null>(null);
  const [deadline, setDeadline] = useState<ActivityDeadlineType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (errors.length > 0) {
      errors.forEach((e) => {
        addNotification(e);
      });
    }
  }, [errors]);

  async function getData() {
    setErrors([]);
    setActivity(null);
    setDeadline(null);
    setIsLoading(true);

    try {
      const activityData = await fetchWithErrorHandling(
        `/api/activity-upload/${id}`
      );
      const deadlineData = await fetchWithErrorHandling(
        `/api/activity-deadline/${activityData.activity_upload.deadline_id}`
      );

      const isPastDeadline = isLate(deadlineData.activity_deadline.deadline);

      const allSubmissionsData = await fetchWithErrorHandling(
        "/api/activity-submission"
      );

      const activitySubmissionsData = (
        await Promise.all(
          allSubmissionsData.map(async (submission: ActivitySubmissionType) => {
            if (submission.activity_upload_id !== Number(id)) return null;
            return submission;
          })
        )
      ).filter(Boolean);

      const studentSubmissionsData: SubmissionDisplayType[] = await Promise.all(
        activitySubmissionsData.map(
          async (submission: ActivitySubmissionType) => {
            const student = await fetchWithErrorHandling(
              `/api/students/${submission.student_id}`
            );
            const userData = await fetchWithErrorHandling(
              `/api/users/${submission.student_id}`
            );
            const mappedAttachments: LinkType[] = submission.attachments.map(
              (attachment: string) => {
                const name = attachment.split("/").pop() || "Unknown";
                return { url: attachment, name };
              }
            );

            return {
              id: submission.id,
              avatarUrl: student.student.profile_picture,
              fn: student.student.fn,
              ln: student.student.ln,
              email: userData.user.email,
              attachments: mappedAttachments,
              status:
                !submission.score && isPastDeadline
                  ? "late"
                  : !submission.score && !isPastDeadline
                  ? "not-submitted"
                  : "submitted",
              score: submission.score ? submission.score : null,
            };
          }
        )
      );

      setSubmissions(studentSubmissionsData);

      setActivity(activityData.activity_upload);
      setDeadline(deadlineData.activity_deadline);
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

  const isLate = (targetDateTime: string): boolean => {
    const now = new Date(); // Current date and time
    const targetDate = new Date(targetDateTime); // Convert the target string to a Date object

    return now > targetDate; // Returns true if now is after the target date
  };

  if (isLoading) return <LoadingSpinner loading={true} />;

  return (
    <>
      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between">
          <Heading title="CSOS 313" description="Operating Systems" />
        </div>
        <Separator />
      </div>
      <div className="h-full p-10">
        <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="submitted">Submitted</TabsTrigger>
                <TabsTrigger value="late">Late</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle className="text-2xl">{activity?.title}</CardTitle>
                  <CardDescription>
                    {activity?.total_score} points
                  </CardDescription>
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
                        <TableHead>Attachment</TableHead>

                        <TableHead className="hidden md:table-cell">
                          Status
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Grade
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {submissions.length > 0 &&
                        submissions.map((submission) => (
                          <TableRow>
                            <TableCell className="hidden sm:table-cell">
                              <Avatar>
                                <AvatarImage src={submission.avatarUrl!} />
                                <AvatarFallback>
                                  {submission.fn[0].toUpperCase()}
                                  {submission.ln[0].toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                            </TableCell>
                            <TableCell className="font-medium">
                              {submission.email}
                            </TableCell>
                            <TableCell className="font-medium">
                              {submission.fn} {submission.ln}
                            </TableCell>
                            <TableCell className="font-medium">
                              {submission.attachments.map((link, i) => (
                                <div key={i} className="flex items-center mb-2">
                                  <MdAttachment className="mr-2" />
                                  <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {link.name}
                                  </a>
                                </div>
                              ))}
                            </TableCell>

                            <TableCell className="hidden md:table-cell">
                              <Badge
                                variant={
                                  submission.status === "late"
                                    ? "late"
                                    : "submitted"
                                }
                              >
                                <div
                                  className={`h-1.5 w-1.5 rounded-full mr-1.5 ${
                                    submission.status === "late"
                                      ? "bg-red-500"
                                      : "bg-green-500"
                                  }`}
                                />{" "}
                                {submission.status === "late"
                                  ? "Late"
                                  : "Submitted"}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <GradeForm
                                submission={submission}
                                deadline={deadline!}
                                isLate={isLate}
                                fetchWithErrorHandling={fetchWithErrorHandling}
                                token={token}
                                total_score={activity?.total_score!}
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
                    <strong>{submissions.length}</strong> Students
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
  submission,
  deadline,
  isLate,
  fetchWithErrorHandling,
  token,
  total_score,
}: {
  submission: SubmissionDisplayType;
  deadline: ActivityDeadlineType;
  isLate: (targetDateTime: string) => boolean;
  fetchWithErrorHandling: (url: string, headers?: any) => Promise<any>;
  token: string;
  total_score: number;
}) => {
  // Initialize the state for the score value
  const [score, setScore] = useState<string>(
    submission.score ? String(submission.score) : ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(submission.score !== null);

  const lateAndDeadlinePassed =
    isLate(deadline.deadline) && submission.score === null;

  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      (!Number(e.target.value) && e.target.value !== "") ||
      Number(e.target.value) < 0
    )
      return;
    const newScore = e.target.value;
    setScore(newScore); // Update the state with the new value
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // Prevent default form submission (refresh)
    try {
      setIsLoading(true);
      const gradedData = await fetchWithErrorHandling(
        `/api/grade-submission/${submission.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ score: Number(score) }),
        }
      );

      if (gradedData) setSubmitted(true);
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
          value={score} // Controlled value with state
          disabled={submitted || lateAndDeadlinePassed || isLoading}
          onChange={handleScoreChange}
          name="score"
        />
        <span>/ {total_score}</span>
      </div>
      <Button
        className="bg-dhvsu"
        type="submit"
        disabled={submitted || lateAndDeadlinePassed || isLoading}
      >
        {isLoading ? "Grading..." : "Grade"}
      </Button>
    </form>
  );
};

export default Submissions;
