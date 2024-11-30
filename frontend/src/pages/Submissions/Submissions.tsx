import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import SubmissionLayout from "@/layouts/SubmissionLayout";
import React from "react";

const Submissions = () => {
  return (
    <SubmissionLayout>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title="CSOS 313" description="Operating Systems" />
        </div>
        <Separator />
      </div>
    </SubmissionLayout>
  );
};

export default Submissions;
