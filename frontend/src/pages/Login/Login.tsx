'use client';

import { useState } from 'react';

// Some react-hook-form import fucking shit
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOff } from 'lucide-react';

import { loginSchema } from '@/lib/schema';

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
        console.log(values);
    };

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="auth-form z-20"
                >
                    <h1 className="form-title">Login</h1>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <div className="shad-form-item w-full">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Email"
                                                className="shad-input"
                                                // type="email"
                                                {...field}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="shad-form-message" />
                                </FormItem>
                            );
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <div className="shad-form-item">
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center ">
                                                <Input
                                                    placeholder="Password"
                                                    className="shad-input"
                                                    type={showPassword ? 'text' : 'password'}
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword((show) => !show)}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="text-brand" />
                                                    ) : (
                                                        <EyeIcon className="text-brand" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                    </div>
                                    <FormMessage className="shad-form-message" />
                                </FormItem>
                            );
                        }}
                    />
                    <Button
                        type="submit"
                        className="form-submit-button"
                        disabled={isLoading}
                    >
                        Log In
                        {isLoading && (
                            // loader svg here
                            ""
                        )}
                    </Button>
                    <div className="body-2 flex justify-center">
                        <p className="text-light-100">Don't have an account?</p>
                        <a href="/register" className="ml-1 font-medium text-brand">
                            Sign Up
                        </a>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default Login;
