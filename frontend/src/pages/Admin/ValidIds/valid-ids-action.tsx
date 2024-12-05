import TableSearchInput from "@/components/ui/table/table-search-input";

const ValidIdsAction = () => {
  return (
    <div className="flex items-center justify-between gap-2 py-5">
      <div className="flex flex-1 gap-4">
        <TableSearchInput placeholder="Search by ID..." />
      </div>
    </div>
  );
};

export default ValidIdsAction;
