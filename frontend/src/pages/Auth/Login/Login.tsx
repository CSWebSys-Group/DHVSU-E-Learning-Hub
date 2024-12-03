"use client";

import { useContext, useState } from "react";

// Some react-hook-form import fucking shit
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { EyeIcon, EyeOff, LoaderCircle } from "lucide-react";

import { loginSchema } from "@/lib/schema";
import { Link, useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
import ErrorMessage from "@/components/ErrorMessage";

const Login = ({
  setToken,
}: {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [hideErrorMessage, setHideErrorMessage] = useState(true);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
    setErrors([]);
    setIsLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "post",
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          // Type casting the value of data.errors to string[]
          Object.values(data.errors).forEach((errorMessages) => {
            // Type casting errorMessages to string[] explicitly
            (errorMessages as string[]).forEach((message) => {
              setErrors((prevErrors) => [...prevErrors, message]);
            });
          });
        } else {
          setErrors((prevErrors) => [
            ...prevErrors,
            "Something went wrong with logging in",
          ]);
        }
        console.log(errors);
      }

      // Assuming `data.token` contains the token
      if (data.token) {
        // Set the token in a cookie with an expiration of 7 days
        const expires = new Date();
        expires.setDate(expires.getDate() + 14); // 14 days from now
        document.cookie = `authToken=${
          data.token.plainTextToken
        }; expires=${expires.toUTCString()}; path=/; secure; SameSite=Strict`;
        setToken(data.token.plainTextToken);
        navigate("/user/dashboard");
      }
    } catch (error) {
      console.log(errors);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="auth-form z-20"
        >
          <h1 className="form-title">Login</h1>
          <motion.div
            initial={{
              y: 5,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
            }}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <div className="shad-form-item w-full">
                      <FormLabel className="shad-form-label">Email</FormLabel>
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
                      <FormLabel className="shad-form-label">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center ">
                          <Input
                            placeholder="Password"
                            className="shad-input"
                            type={showPassword ? "text" : "password"}
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
          </motion.div>
          <AnimatePresence>
            {errors.length > 0 && hideErrorMessage
              ? errors.map((error, i) => (
                  <ErrorMessage
                    error={error}
                    setHideErrorMessage={setHideErrorMessage}
                    key={i}
                  />
                ))
              : null}
          </AnimatePresence>

          <div className="flex justify-end">
            <Link
              to={"/auth/forgot-password"}
              className="text-dhvsu font-semibold text-right hover:underline transition-all duration-100"
            >
              Forgot your password?
            </Link>
          </div>

          <Button
            type="submit"
            className="form-submit-button"
            disabled={isLoading}
          >
            Log In
            {isLoading && (
              <LoaderCircle size={24} className="ml-2 animate-spin" />
            )}
          </Button>
          <div className="body-2 flex justify-center">
            <p className="text-light-100">Don't have an account?</p>
            <Link to={"/auth/signup"} className="ml-1 font-medium text-brand">
              Sign Up
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
};

export default Login;
