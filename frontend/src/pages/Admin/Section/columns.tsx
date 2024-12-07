import { ColumnDef } from "@tanstack/react-table";

export type SectionTable = {
  id: number;
  courseName: string;
  year: number;
  section: string;
};

export const columns: ColumnDef<SectionTable>[] = [
  {
    accessorKey: "courseName",
    header: "Course Name",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "section",
    header: "Section",
  },
];
