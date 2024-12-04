import { ColumnDef } from "@tanstack/react-table";

export type CourseTable = {
  id: string;
  name: string;
  code: string;
};

export const columns: ColumnDef<CourseTable>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
];
