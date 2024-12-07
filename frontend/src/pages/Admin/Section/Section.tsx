import { useState, useEffect } from "react";

import { SectionTable, columns } from "./columns";
import { DataTable } from "../../../components/ui/table/data-table";

import { useSearchParams } from "react-router-dom";
import SectionTableActions from "./section-table-actions";

async function getData(searchTerm: string = ""): Promise<SectionTable[]> {
  // Fetch data from your API here.
  const allData = [
    {
      id: "1",
      courseName: "Bachelor of Science in Computer Science",
      year: "1",
      section: "1B",
    },
    {
      id: "2",
      courseName: "Bachelor of Science in Computer Science",
      year: "3",
      section: "3B",
    },
  ];

  if (searchTerm) {
    return allData.filter((item) =>
      item.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return allData;
}

const Section = () => {
  const [data, setData] = useState<SectionTable[]>([]);

  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  useEffect(() => {
    getData(search).then((fetchedData) => setData(fetchedData));
  }, [search]);

  console.log(data);

  return (
    <div className="container mx-auto py-10">
      <div>
        <h2 className="text-3xl tracking-tight text-dhvsu">Sections</h2>
      </div>
      <SectionTableActions />
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Section;
