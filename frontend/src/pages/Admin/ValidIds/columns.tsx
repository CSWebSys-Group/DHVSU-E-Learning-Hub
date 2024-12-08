import { ColumnDef } from "@tanstack/react-table";

export type ValidId = {
  id: number;
  user_type: "S" | "T";
};

export const columns: ColumnDef<ValidId>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },

  {
    accessorKey: "user_type",
    header: "Type",
    cell: ({ row }) => (row.original.user_type === "S" ? "Student" : "Teacher"),
  },
];
