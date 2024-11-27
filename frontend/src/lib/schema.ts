import { z } from "zod";

export const registerSchema = z
  .object({
    id: z.string().min(10, "Please enter a valid Id"),
    user_type: z.enum(["T", "S"], {
      errorMap: () => ({ message: "Please select a option." }),
    }),
    fn: z.string().min(1, "First name is required"),
    ln: z.string().min(1, "Last name is required"),
    email: z
      .string()
      .email("Invalid email format")
      .refine((email) => email.endsWith("@dhvsu.edu.ph"), {
        message: "Email must end with @dhvsu.edu.ph",
      }),
    password: z
      .string()
      .min(8, { message: "Password must at least be 8 character(s)" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character",
      }),
    password_confirmation: z.string(),
  })
  .refine(
    (data) => {
      // if we return true, form is validated
      // if we return false, form is not valid
      return data.password === data.password_confirmation;
    },
    {
      message: "Passwords do not match",
      path: ["password_confirmation"],
    }
  );

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});
