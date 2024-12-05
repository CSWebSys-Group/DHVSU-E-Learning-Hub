import { useState, useEffect } from "react";
import { type AuditLog, columns } from "./columns";
import { DataTable } from "../../../components/ui/table/data-table";
import { useSearchParams } from "react-router-dom";
import AuditLogsAction from "./audit-logs-action";

const SampleData: AuditLog[] = [
  {
    id: 1,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    type: "S",
    created_at: "2024-12-06",
    time: "12:00:00",
  },
  {
    id: 2,
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    type: "T",
    created_at: "2024-12-06",
    time: "14:00:00",
  },
  {
    id: 3,
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    type: "S",
    created_at: "2024-12-06",
    time: "16:00:00",
  },
  {
    id: 4,
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    type: "T",
    created_at: "2024-12-06",
    time: "18:00:00",
  },
  {
    id: 5,
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    type: "S",
    created_at: "2024-12-06",
    time: "20:00:00",
  },
  {
    id: 6,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    type: "T",
    created_at: "2024-12-06",
    time: "22:00:00",
  },
  {
    id: 7,
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    type: "S",
    created_at: "2024-12-06",
    time: "23:00:00",
  },
];

async function getData(searchTerm: string = ""): Promise<AuditLog[]> {
  if (searchTerm) {
    return SampleData.filter((item) => item.id.toString().includes(searchTerm));
  }

  return SampleData;
}

const AuditLogs = () => {
  const [data, setData] = useState<AuditLog[]>([]);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  useEffect(() => {
    getData(search).then((fetchedData) => setData(fetchedData));
  }, [search]);

  console.log(data);

  return (
    <div className="container mx-auto py-10">
      <AuditLogsAction />
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default AuditLogs;
