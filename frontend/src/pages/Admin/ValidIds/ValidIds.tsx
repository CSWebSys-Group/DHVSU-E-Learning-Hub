import { useState, useEffect } from "react";

import { type ValidId, columns } from "./columns";
import { DataTable } from "../../../components/ui/table/data-table";

import { useSearchParams } from "react-router-dom";
import ValidIdsActions from "./valid-ids-action";

const SampleData: ValidId[] = [
  { id: 1, type: "S" },
  { id: 2, type: "T" },
  { id: 3, type: "S" },
  { id: 4, type: "T" },
  { id: 5, type: "S" },
  { id: 6, type: "T" },
  { id: 7, type: "S" },
];

async function getData(searchTerm: string = ""): Promise<ValidId[]> {
  if (searchTerm) {
    return SampleData.filter((item) => item.id.toString().includes(searchTerm));
  }

  return SampleData;
}

const ValidIds = () => {
  const [data, setData] = useState<ValidId[]>([]);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  useEffect(() => {
    getData(search).then((fetchedData) => setData(fetchedData));
  }, [search]);

  console.log(data);

  return (
    <div className="container mx-auto py-10">
      <ValidIdsActions />
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default ValidIds;
