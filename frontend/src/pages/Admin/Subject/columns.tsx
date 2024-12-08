import { ColumnDef } from "@tanstack/react-table";

export type SubjectTable = {
  id: number;
  subjectName: string;
  course_section: string;
  code: string;
};

export const columns: ColumnDef<SubjectTable>[] = [
  {
    accessorKey: "subjectName",
    header: "Name",
  },
  {
    accessorKey: "course_section",
    header: "Course & Section",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
];
