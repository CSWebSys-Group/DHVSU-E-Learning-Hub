import { ColumnDef } from "@tanstack/react-table";

export type AuditLog = {
  id: number;
  description: string;
  type: "Student" | "Teacher" | "Admin";
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
    cell: ({ row }) => row.original.type,
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => row.original.created_at,
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => row.original.time,
  },
];
