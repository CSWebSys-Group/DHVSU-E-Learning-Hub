import { useState } from "react";

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

const SubmitGrade = () => {
  // context api fetch from db?
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      avatarUrl: "url ng putangina", // avatar student url fetch
      avatarFallback: "EJ",
      email: "2022308552@dhvsu.edu.ph",
      fullname: "Ezekiel Jhon G. Carreon",
      grade: "",
    },
    {
      id: 2,
      avatarUrl: "url ng putangina",
      avatarFallback: "FT",
      email: "2022308452@dhvsu.edu.ph",
      fullname: "Florence Ivan Tuazon",
      grade: "",
    },
  ]);

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
                              {submission.fullname}
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

export default SubmitGrade;
