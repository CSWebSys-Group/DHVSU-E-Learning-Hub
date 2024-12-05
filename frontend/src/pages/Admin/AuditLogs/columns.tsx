import { ColumnDef } from "@tanstack/react-table";

export type AuditLog = {
  id: number;
  description: string;
  type: "S" | "T";
  created_at: string;
  time: string;
};

export const columns: ColumnDef<AuditLog>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => row.original.description,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (row.original.type === "S" ? "Student" : "Teacher"),
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: () => new Date().toLocaleDateString(),
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: () => new Date().toLocaleTimeString(),
  },
];
