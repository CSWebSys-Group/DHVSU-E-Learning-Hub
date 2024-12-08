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

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const courseFormScehma = z.object({
  name: z.string().min(1, { message: "Course name is required." }),
  code: z.string().min(1, { message: "Code is required." }),
});

type CourseFormScehmaType = z.infer<typeof courseFormScehma>;

const CourseCreateForm = ({
  modalClose,
  token,
  setErrors,
  fetchWithErrorHandling,
}: {
  modalClose: () => void;
  token: string;
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
  fetchWithErrorHandling: (url: string, headers?: any) => Promise<any>;
}) => {
  const form = useForm<CourseFormScehmaType>({
    resolver: zodResolver(courseFormScehma),
    defaultValues: {},
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: CourseFormScehmaType) => {
    try {
      setErrors([]);
      setIsLoading(true);
      const resData = await fetchWithErrorHandling("/api/courses", {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          course_name: values.name,
          course_code: values.code,
        }),
      });

      if (resData) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-2">
      <Heading
        title={"CREATE NEW COURSE"}
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
            <FormLabel>Course Name</FormLabel>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Course"
                      {...field}
                      className="px-4 py-6 bg-white border border-slate-200 rounded-lg"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormLabel>Course Code</FormLabel>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Code"
                      {...field}
                      className="px-4 py-6 bg-white border border-slate-200 rounded-lg"
                      disabled={isLoading}
                    />
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

export default CourseCreateForm;
