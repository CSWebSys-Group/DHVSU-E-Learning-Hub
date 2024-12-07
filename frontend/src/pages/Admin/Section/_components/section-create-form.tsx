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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CourseType } from "@/lib/types";
import { useState } from "react";

const sectionFormSchema = z.object({
  year: z.enum(["1", "2", "3", "4"], {
    errorMap: () => ({ message: "Please select a option." }),
  }),
  name: z.string().min(2, { message: "Section is required" }),
  course_id: z.number().min(1, { message: "Please select a course" }),
});

type SectionFormSchemaType = z.infer<typeof sectionFormSchema>;

const SectionCreateForm = ({
  modalClose,
  token,
  setErrors,
  fetchWithErrorHandling,
  allCourses,
}: {
  modalClose: () => void;
  token: string;
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
  fetchWithErrorHandling: (url: string, headers?: any) => Promise<any>;
  allCourses: CourseType[];
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<SectionFormSchemaType>({
    resolver: zodResolver(sectionFormSchema),
    defaultValues: {
      course_id: 0,
    },
  });
  const onSubmit = async (values: SectionFormSchemaType) => {
    try {
      setIsLoading(true);
      setErrors([]);
      const resData = await fetchWithErrorHandling("/api/sections", {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          year: Number(values.year),
          name: values.name,
          course_id: values.course_id,
        }),
      });

      if (resData) window.location.reload();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-2">
      <Heading
        title={"CREATE NEW SECTION"}
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
            <FormLabel>Year Level</FormLabel>
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <div className="px-4 py-2 bg-white border border-slate-200 rounded-lg">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      {...field}
                    >
                      <SelectTrigger className="border-none shadow-none focus:ring-none focus:outline-none p-0">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormLabel>Section Name</FormLabel>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="1A, 2B, 3C, 4E"
                      {...field}
                      className="px-4 py-6 bg-white border border-slate-200 rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormLabel>Course</FormLabel>
            <FormField
              control={form.control}
              name="course_id"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <select
                      className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full text-black"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))} // Ensure value is parsed as a number
                    >
                      <option value={0} disabled>
                        Select a course
                      </option>
                      {allCourses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.course_name}
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
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-full bg-dhvsu hover:bg-dhvsu/50"
              size="lg"
            >
              Create
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SectionCreateForm;
