import PopupModal from "@/components/ui/popup-modal";
import SectionCreateForm from "./_components/section-create-form";

import TableSearchInput from "@/components/ui/table/table-search-input";
import React from "react";

const SectionTableActions = () => {
  return (
    <div className="flex items-center justify-between gap-2 py-5">
      <div className="flex flex-1 gap-4">
        <TableSearchInput placeholder="Search..." />
      </div>
      <div className="flex gap-3">
        <PopupModal
          renderModal={(onClose) => <SectionCreateForm modalClose={onClose} />}
        />
      </div>
    </div>
  );
};

export default SectionTableActions;
