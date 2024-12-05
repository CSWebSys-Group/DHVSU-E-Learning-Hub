import TableSearchInput from "@/components/ui/table/table-search-input";
import React from "react";

const StudentTableActions = () => {
  return (
    <div className="flex items-center justify-between gap-2 py-5">
      <div className="flex flex-1 gap-4">
        <TableSearchInput placeholder="Search..." />
      </div>
    </div>
  );
};

export default StudentTableActions;
