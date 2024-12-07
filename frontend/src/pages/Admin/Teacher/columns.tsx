import { ColumnDef } from "@tanstack/react-table";

export type TeacherTable = {
  id: number;
  name: string;
};

export const columns: ColumnDef<TeacherTable>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
];
