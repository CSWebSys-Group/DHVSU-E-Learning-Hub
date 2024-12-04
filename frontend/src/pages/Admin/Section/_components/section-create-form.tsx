import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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

const sectionFormSchema = z.object({
  courseName: z.enum(
    [
      "Bachelor of Science in Nursing",
      "Bachelor of Science in Aeronautical Engineering",
      "Bachelor of Science in Computer Science",
    ],
    {
      errorMap: () => ({ message: "Please select a option." }),
    }
  ),
  year: z.enum(["1", "2", "3", "4"], {
    errorMap: () => ({ message: "Please select a option." }),
  }),
  name: z.string().min(2, { message: "Section is required" }),
  students: z.enum([""], {
    errorMap: () => ({ message: "Please select a option." }),
  }),
  subjects: z.enum([""], {
    errorMap: () => ({ message: "Please select a option." }),
  }),
});

type SectionFormSchemaType = z.infer<typeof sectionFormSchema>;

const SectionCreateForm = ({ modalClose }: { modalClose: () => void }) => {
  const form = useForm<SectionFormSchemaType>({
    resolver: zodResolver(sectionFormSchema),
    defaultValues: {},
  });

  const onSubmit = (values: SectionFormSchemaType) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
            <FormField
              control={form.control}
              name="courseName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="p-3 bg-white border border-slate-200 rounded-lg">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        {...field}
                      >
                        <SelectTrigger className="border-none shadow-none focus:ring-none focus:outline-none p-0">
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bscs">
                            Bachelor of Science in Computer Science
                          </SelectItem>
                          <SelectItem value="bsn">
                            Bachelor of Science in Nursing
                          </SelectItem>
                          <SelectItem value="bsae">
                            Bachelor of Science in Aeronautical Engineering
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Section"
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
              name="students"
              render={({ field }) => (
                <FormItem>
                  <div className="px-4 py-2 bg-white border border-slate-200 rounded-lg">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      {...field}
                    >
                      <SelectTrigger className="border-none shadow-none focus:ring-none focus:outline-none p-0">
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* add ka nalang select item here or .map */}
                        <SelectItem value="2022308552">
                          Ezekiel Jhon G. Carreon
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subjects"
              render={({ field }) => (
                <FormItem>
                  <div className="px-4 py-2 bg-white border border-slate-200 rounded-lg">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      {...field}
                    >
                      <SelectTrigger className="border-none shadow-none focus:ring-none focus:outline-none p-0">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CSIAS">
                          Information Assurance and Security
                        </SelectItem>
                        <SelectItem value="CSAC">
                          Space and Time Complexity
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
