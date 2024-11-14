import { z } from 'zod';

export const registerSchema = z
    .object({
        firstName: z.string().min(1, 'First name is required'),
        lastName: z.string().min(1, 'Last name is required'),
        emailAddress: z.string().email(),
        password: z
            .string()
            .min(8, { message: 'Password must at least be 8 character(s)' })
            .regex(/[A-Z]/, {
                message: 'Password must contain at least one uppercase letter',
            })
            .regex(/[!@#$%^&*(),.?":{}|<>]/, {
                message: 'Password must contain at least one special character',
            }),
        passwordConfirm: z.string(),
    })
    .refine(
        (data) => {
            // if we return true, form is validated
            // if we return false, form is not valid
            return data.password === data.passwordConfirm;
        },
        {
            message: 'Passwords do not match',
            path: ['passwordConfirm'],
        }
    );

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, 'Password is required'),
});
