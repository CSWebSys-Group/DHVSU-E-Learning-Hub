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

const validIdFormSchema = z.object({
  id: z.number().min(1, { message: "ID is required." }),
  user_type: z.enum(["S", "T"], {
    errorMap: () => ({ message: "Please select a option." }),
  }),
});

type ValidIdFormSchemaType = z.infer<typeof validIdFormSchema>;

const ValidIdCreateForm = ({
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
  const form = useForm<ValidIdFormSchemaType>({
    resolver: zodResolver(validIdFormSchema),
    defaultValues: {},
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: ValidIdFormSchemaType) => {
    try {
      setErrors([]);
      setIsLoading(true);
      const resData = await fetchWithErrorHandling("/api/valid-ids", {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: Number(values.id),
          user_type: values.user_type,
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
        title={"CREATE NEW VALID ID"}
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
            <FormLabel>ID</FormLabel>
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Valid ID"
                      {...field}
                      type="number"
                      className="px-4 py-6 bg-white border border-slate-200 rounded-lg"
                      disabled={isLoading}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormLabel>User Type</FormLabel>
            <FormField
              control={form.control}
              name="user_type"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <select
                      className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full text-black"
                      {...field}
                      defaultValue=""
                      onChange={(e) => field.onChange(e.target.value)} // Ensure value is parsed as a number
                    >
                      <option value="" disabled>
                        Select a user type
                      </option>
                      <option value="S">Student</option>
                      <option value="T">Teacher</option>
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

export default ValidIdCreateForm;
