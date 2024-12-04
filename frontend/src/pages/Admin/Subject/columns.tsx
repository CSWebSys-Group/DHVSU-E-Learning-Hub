import { ColumnDef } from "@tanstack/react-table";

export type SubjectTable = {
  id: string;
  subjectName: string;
  code: string;
};

export const columns: ColumnDef<SubjectTable>[] = [
  {
    accessorKey: "subjectName",
    header: "Name",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
];
