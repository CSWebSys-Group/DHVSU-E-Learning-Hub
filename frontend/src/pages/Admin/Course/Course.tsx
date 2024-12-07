import { useState, useEffect } from "react";

import { CourseTable, columns } from "./columns";
import { DataTable } from "../../../components/ui/table/data-table";

import { useSearchParams } from "react-router-dom";
import CourseTableActions from "./course-table-actions";

async function getData(searchTerm: string = ""): Promise<CourseTable[]> {
  // Fetch data from your API here.
  const allData = [
    {
      id: "1",
      name: "Bachelor of Science in Computer Science",
      code: "BSCS",
    },
    {
      id: "2",
      name: "Bachelor of Science in Information Technology",
      code: "BSIT",
    },
  ];

  if (searchTerm) {
    return allData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return allData;
}

const Section = () => {
  const [data, setData] = useState<CourseTable[]>([]);

  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  useEffect(() => {
    getData(search).then((fetchedData) => setData(fetchedData));
  }, [search]);

  console.log(data);

  return (
    <div className="container mx-auto py-10">
      <div>
        <h2 className="text-3xl tracking-tight text-dhvsu">Courses</h2>
      </div>
      <CourseTableActions />
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Section;
