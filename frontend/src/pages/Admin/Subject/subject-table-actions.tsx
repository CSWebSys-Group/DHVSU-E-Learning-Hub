import PopupModal from "@/components/ui/popup-modal";
import SubjectCreateForm from "./_components/subject-create-form";

import TableSearchInput from "@/components/ui/table/table-search-input";
import {
  CourseType,
  SectionType,
  SubjectType,
  TeacherCreds,
} from "@/lib/types";

type PropType = {
  fetchWithErrorHandling: (url: string, headers?: any) => Promise<any>;
  allCourses: CourseType[];
  allSections: SectionType[];
  allTeachers: TeacherCreds[];
  token: string;
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
};

const SubjectTableActions = ({
  fetchWithErrorHandling,
  allCourses,
  allSections,
  allTeachers,
  token,
  setErrors,
}: PropType) => {
  return (
    <div className="flex items-center justify-between gap-2 py-5">
      <div className="flex flex-1 gap-4">
        <TableSearchInput placeholder="Search..." />
      </div>
      <div className="flex gap-3">
        <PopupModal
          renderModal={(onClose) => (
            <SubjectCreateForm
              fetchWithErrorHandling={fetchWithErrorHandling}
              allCourses={allCourses}
              allSections={allSections}
              setErrors={setErrors}
              allTeachers={allTeachers}
              modalClose={onClose}
              token={token}
            />
          )}
        />
      </div>
    </div>
  );
};

export default SubjectTableActions;
