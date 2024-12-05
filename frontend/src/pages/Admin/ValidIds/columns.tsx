import { ColumnDef } from "@tanstack/react-table";

export type ValidId = {
  id: number;
  type: "S" | "T";
};

export const columns: ColumnDef<ValidId>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },

  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (row.original.type === "S" ? "Student" : "Teacher"),
  },
];
