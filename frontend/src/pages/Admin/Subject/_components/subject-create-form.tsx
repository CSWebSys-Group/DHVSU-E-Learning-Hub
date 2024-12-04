import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const subjectFormSchema = z.object({
  subjectName: z.string().min(1, { message: "Subject name is required." }),
  code: z.string().min(1, { message: "Code is required." }),
});

type SubjectFormSchemaType = z.infer<typeof subjectFormSchema>;

const CourseCreateForm = ({ modalClose }: { modalClose: () => void }) => {
  const form = useForm<SubjectFormSchemaType>({
    resolver: zodResolver(subjectFormSchema),
    defaultValues: {},
  });

  const onSubmit = (values: SubjectFormSchemaType) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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

export default CourseCreateForm;
