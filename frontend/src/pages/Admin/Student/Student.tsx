import { useState, useEffect } from "react";

import { StudentTable, columns } from "./columns";
import { DataTable } from "../../../components/ui/table/data-table";

import { useSearchParams } from "react-router-dom";
import StudentTableActions from "./student-table-action";

async function getData(searchTerm: string = ""): Promise<StudentTable[]> {
  // Fetch data from your API here.
  const allData = [
    {
      id: "1",
      name: "Ezekiel Jhon G. Carreon",
      year_section: "BSCS-3B",
    },
    {
      id: "2",
      name: "Rence Carlo Narido",
      year_section: "BSCS-3B",
    },
    {
      id: "3",
      name: "Florence Ivan Tuazon",
      year_section: "BSCS-3B",
    },
    {
      id: "4",
      name: "Brishia Beltran",
      year_section: "BSCS-3B",
    },
    {
      id: "5",
      name: "Genesis Rev Sanchez",
      year_section: "BSCS-3B",
    },
    {
      id: "6",
      name: "Emil P. David",
      year_section: "BSCS-3B",
    },
    {
      id: "7",
      name: "Yainnier Layague",
      year_section: "BSCS-3B",
    },
    // ...
  ];

  if (searchTerm) {
    return allData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return allData;
}

const Student = () => {
  const [data, setData] = useState<StudentTable[]>([]);

  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  useEffect(() => {
    getData(search).then((fetchedData) => setData(fetchedData));
  }, [search]);

  console.log(data);

  return (
    <div className="container mx-auto py-10">
      <StudentTableActions />
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Student;
