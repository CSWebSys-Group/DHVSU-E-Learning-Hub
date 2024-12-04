import { useState } from "react";

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

const Submissions = () => {
  // context api fetch from db?
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      avatarUrl: "url ng putangina", // avatar student url fetch
      avatarFallback: "EJ",
      email: "2022308552@dhvsu.edu.ph",
      fileName: "word.pdf",
      submissionDate: "2023-07-12 10:45 AM",
      status: "late", // 'submitted' or 'late' since there are 2 variants of badges
      grade: "",
    },
    {
      id: 2,
      avatarUrl: "url ng putangina",
      avatarFallback: "RB",
      email: "2022308452@dhvsu.edu.ph",
      fileName: "image.jpg",
      submissionDate: "2023-07-12 10:45 AM",
      status: "submitted",
      grade: "",
    },
  ]);

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
                  <CardTitle className="text-2xl">
                    Activity 8 - What is Omada Network
                  </CardTitle>
                  <CardDescription>50 points</CardDescription>
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
                        <TableHead>Attachment</TableHead>
                        <TableHead>Deadline</TableHead>
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
                                <AvatarImage src={submission.avatarUrl} />
                                <AvatarFallback>
                                  {submission.avatarFallback}
                                </AvatarFallback>
                              </Avatar>
                            </TableCell>
                            <TableCell className="font-medium">
                              {submission.email}
                            </TableCell>
                            <TableCell className="font-medium">
                              <MdAttachment className="inline mr-2" />
                              <span className="underline">
                                {submission.fileName}
                              </span>
                            </TableCell>
                            <TableCell>{submission.submissionDate}</TableCell>
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
                              <input
                                type="text"
                                className="border-b-2 border-black w-5"
                                value={submission.grade}
                                onChange={(e) =>
                                  console.log("grade handle fucking logic here")
                                }
                              />{" "}
                              / 50
                            </TableCell>
                            <TableCell>
                              <form onSubmit={(e) => console.log("dsadsa")}>
                                <Button className="bg-dhvsu" type="submit">
                                  Grade
                                </Button>
                              </form>
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
    </>
  );
};

export default Submissions;
