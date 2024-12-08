import PopupModal from "@/components/ui/popup-modal";
import TableSearchInput from "@/components/ui/table/table-search-input";
import ValidIdCreateForm from "./_components/valid-ids-create-form";

const ValidIdsAction = ({
  token,
  setErrors,
  fetchWithErrorHandling,
}: {
  token: string;
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
  fetchWithErrorHandling: (url: string, headers?: any) => Promise<any>;
}) => {
  return (
    <div className="flex items-center justify-between gap-2 py-5">
      <div className="flex flex-1 gap-4">
        <TableSearchInput placeholder="Search by ID..." />
      </div>
      <div className="flex gap-3">
        <PopupModal
          renderModal={(onClose) => (
            <ValidIdCreateForm
              token={token}
              setErrors={setErrors}
              fetchWithErrorHandling={fetchWithErrorHandling}
              modalClose={onClose}
            />
          )}
        />
      </div>
    </div>
  );
};

export default ValidIdsAction;
