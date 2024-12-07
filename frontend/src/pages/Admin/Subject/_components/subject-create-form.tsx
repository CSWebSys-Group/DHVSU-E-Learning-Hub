import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  CourseType,
  SectionType,
  SubjectType,
  TeacherCreds,
} from "@/lib/types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const subjectFormSchema = z.object({
  subjectName: z.string().min(1, { message: "Subject name is required." }),
  code: z.string().min(1, { message: "Code is required." }),
  section_id: z.number().min(1, { message: "Subject is required." }),
  teacher_id: z.number().min(1, { message: "Teacher is required." }),
  type: z.enum(["minor", "major"]),
});

type SubjectFormSchemaType = z.infer<typeof subjectFormSchema>;

type PropType = {
  modalClose: () => void;
  fetchWithErrorHandling: (url: string, headers?: any) => Promise<any>;
  allCourses: CourseType[];
  allSections: SectionType[];
  allTeachers: TeacherCreds[];
  token: string;
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
};

const SubjectCreateForm = ({
  modalClose,
  fetchWithErrorHandling,
  allCourses,
  allSections,
  allTeachers,
  token,
  setErrors,
}: PropType) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SubjectFormSchemaType>({
    resolver: zodResolver(subjectFormSchema),
    defaultValues: {
      code: "",
      subjectName: "",
      teacher_id: 0,
      section_id: 0,
    },
  });

  const onSubmit = async (values: SubjectFormSchemaType) => {
    try {
      setIsLoading(true);
      setErrors([]);
      const resData = await fetchWithErrorHandling(`/api/subjects`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject_code: values.code,
          subject_name: values.subjectName,
          teacher_id: values.teacher_id,
          section_id: values.section_id,
          type: values.type,
        }),
      });

      if (resData) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      modalClose();
    }
  };

  return (
    <div className="px-2">
      <Heading
        title={"CREATE NEW SUBJECT"}
        description={""}
        className="space-y-2 py-4 text-center"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          autoComplete="off"
        >
          <div className="grid gap-x-8 gap-y-4">
            <FormLabel>Subject Name</FormLabel>
            <FormField
              control={form.control}
              name="subjectName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="eg. (Information Assurance and Secuity)"
                      {...field}
                      className="px-4 py-6 bg-white border border-slate-200 rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormLabel>Subject Code</FormLabel>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="eg. (CSIAS)"
                      {...field}
                      className="px-4 py-6 bg-white border border-slate-200 rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormLabel>Type</FormLabel>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <select
                      className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full text-black"
                      defaultValue=""
                      {...field}
                    >
                      <option value="" disabled>
                        Select unit type
                      </option>
                      <option value="minor">Minor</option>
                      <option value="major">Major</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <br />
            <FormLabel>Section</FormLabel>
            <FormField
              control={form.control}
              name="section_id"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <select
                      className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full text-black"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))} // Ensure value is parsed as a number
                    >
                      <option value={0} disabled>
                        Select a section
                      </option>
                      {allSections.map((s) => {
                        const course = allCourses.find(
                          (c) => c.id === s.course_id
                        );
                        return (
                          <option key={s.id} value={s.id}>
                            {course?.course_code || "Unknown Course"} {s.name}
                          </option>
                        );
                      })}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <br />
            <FormLabel>Teacher</FormLabel>
            <FormField
              control={form.control}
              name="teacher_id"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <select
                      className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full text-black"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))} // Ensure value is parsed as a number
                    >
                      <option value={0} disabled>
                        Select a teacher
                      </option>
                      {allTeachers.map((t) => (
                        <option key={t.id} value={t.id}>
                          {`${t.fn} ${t.ln}`}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-between absolute bottom-0 gap-4">
            <Button
              type="button"
              variant="secondary"
              className="rounded-full "
              size="lg"
              onClick={modalClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-full bg-dhvsu hover:bg-dhvsu/50"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SubjectCreateForm;
