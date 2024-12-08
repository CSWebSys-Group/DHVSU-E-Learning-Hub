import { ColumnDef } from "@tanstack/react-table";

export type StudentTable = {
  id: number;
  name: string;
  type: "student";
  year_section: string;
};

export const columns: ColumnDef<StudentTable>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "year_section",
    header: "Year Section",
  },
];
