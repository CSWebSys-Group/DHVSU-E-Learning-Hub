import { useState, useEffect } from "react";

import { SubjectTable, columns } from "./columns";
import { DataTable } from "../../../components/ui/table/data-table";

import { useSearchParams } from "react-router-dom";
import SubjectTableActions from "./subject-table-actions";

async function getData(searchTerm: string = ""): Promise<SubjectTable[]> {
  // Fetch data from your API here.
  const allData = [
    {
      id: "1",
      subjectName: "Software Engineering 1",
      code: "CSSE 313",
    },
    {
      id: "2",
      subjectName: "Web Systems and Technologies",
      code: "BSWEBSYS 313",
    },
  ];

  if (searchTerm) {
    return allData.filter((item) =>
      item.subjectName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return allData;
}

const Subject = () => {
  const [data, setData] = useState<SubjectTable[]>([]);

  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  useEffect(() => {
    getData(search).then((fetchedData) => setData(fetchedData));
  }, [search]);

  console.log(data);

  return (
    <div className="container mx-auto py-10">
      <SubjectTableActions />
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Subject;
