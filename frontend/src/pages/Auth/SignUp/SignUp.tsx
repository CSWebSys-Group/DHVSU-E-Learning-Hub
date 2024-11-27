import { useContext, useEffect, useState, useRef } from "react";

// Some react-hook-form import fucking shit
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { motion, Variants, useAnimationControls } from "framer-motion";

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

import { EyeIcon, EyeOff } from "lucide-react";

import { registerSchema } from "@/lib/schema";
import { Link, useNavigate } from "react-router-dom";
import OtpModal from "@/components/OtpModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const steps = [
  {
    id: "1",
    name: "Verification",
    fields: ["id", "user_type"],
  },
  {
    id: "2",
    name: "Personal Information",
    fields: ["fn", "ln"],
  },
  {
    id: "3",
    name: "Create you password",
    fields: ["password", "passwordConfirm"],
  },
  {
    id: "4",
    name: "Please enter your DHVSU email",
    fields: ["email"],
  },
];

const SignUp = ({
  setToken,
}: {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const prevButtonAnimControls = useAnimationControls();
  const multiStepProgressBar = useAnimationControls();
  const [otpModalActive, setOtpModalActive] = useState(false);
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const [isFocused, setIsFocused] = useState(false);
  const showPasswordButtonRef = useRef(null);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      id: "",
      user_type: "Student",
      fn: "",
      ln: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  async function handleSignUp() {
    setErrors([]);
    try {
      const res = await fetch("/api/register", {
        method: "post",
        body: JSON.stringify({
          ...form.getValues(),
          id: 2217291667,
          user_type: "S",
          gender: "M",
          //birthday: 2024-12-31
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat() as string[];
          setErrors(errorMessages);
        }
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
        console.log(data);
        navigate("/user/dashboard");
      }
    } catch (error) {
      console.log(error);
      setOtpModalActive(false);
      setOtpSuccess(false);
    } finally {
      form.reset();
      setCurrentStep(0);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (errors.length > 0) {
      console.log(errors);
      setOtpSuccess(false);
      setOtpModalActive(false);
    }
  }, [errors]);

  useEffect(() => {
    if (otpSuccess) {
      handleSignUp();
    }
  }, [otpSuccess]);

  const prevButtonVariants: Variants = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
  };

  const progressBarVariants: Variants = {
    initial: { width: `${100 / steps.length}%` },
    animate: { width: `${((currentStep + 1) / steps.length) * 100}%` },
  };

  // Getting the form data (this function's purpose is to send the data to the api e.g localhost:8000/api/users)
  const handleSubmit = async () => {
    try {
      setOtpModalActive(true);
      const res = await fetch("/api/send-otp", {
        method: "post",
        body: JSON.stringify({ email: form.getValues("email") }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat() as string[];
          setErrors(errorMessages);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setCurrentStep(0);
    }
  };

  type FieldName = keyof z.infer<typeof registerSchema>;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const isStepValid = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    }); // Trigger validation for current step fields

    if (currentStep === 1) {
      if (
        isStepValid &&
        form.getValues("password") === form.getValues("password_confirmation")
      ) {
        setCurrentStep((step) => (step < steps.length - 1 ? step + 1 : step));
        form.clearErrors();
      } else {
        form.setError("password_confirmation", {
          type: "manual",
          message: "Passwords do not match",
        });
      }
    } else {
      if (isStepValid) {
        setCurrentStep((step) => (step < steps.length - 1 ? step + 1 : step));
      }
    }
  };

  useEffect(() => {
    multiStepProgressBar.start("animate");
  }, [currentStep, multiStepProgressBar]);

  return (
    <>
      {otpModalActive && (
        <OtpModal
          setOtpModalActive={setOtpModalActive}
          email={form.getValues("email")}
          setOtpSuccess={setOtpSuccess}
          setErrors={setErrors}
        />
      )}
      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()} className="auth-form">
          <h1 className="form-title">Sign Up</h1>
          {/* Multi Step Form Progress bar */}
          <div className="mt-5 flex justify-center gap-5">
            <div className="relative flex py-1">
              <motion.div
                animate={multiStepProgressBar}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 20,
                  duration: 0.3,
                }}
                variants={progressBarVariants}
                initial="initial"
                className="absolute left-0 top-0 size-full rounded-full bg-brand"
              />
              {steps.map((_, index) => (
                <span
                  key={index}
                  className={`z-10 mx-1 size-2 rounded-full ${
                    index < currentStep ? "bg-white" : "bg-gray-300"
                  }`}
                ></span>
              ))}
            </div>
          </div>
          {currentStep === 0 && (
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
                duration: 0.5,
                ease: "easeInOut",
              }}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <div className="shad-form-item">
                        <FormLabel className="shad-form-label">Id</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="eg. 202304552"
                            className="shad-input"
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
                name="user_type"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <div className="shad-form-item w-full">
                        <FormLabel className="shad-form-label">User</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            {...field}
                          >
                            <SelectTrigger className="border-none shadow-none focus:ring-none focus:outline-none p-0">
                              <SelectValue placeholder="Select your option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Student">Teacher</SelectItem>
                              <SelectItem value="Teacher">Student</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </div>
                      <FormMessage className="shad-form-message" />
                    </FormItem>
                  );
                }}
              />
            </motion.div>
          )}
          {currentStep === 1 && (
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
                duration: 0.5,
                ease: "easeInOut",
              }}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="fn"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <div className="shad-form-item">
                        <FormLabel className="shad-form-label">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="First Name"
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
                name="ln"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <div className="shad-form-item w-full">
                        <FormLabel className="shad-form-label">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Last Name"
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
            </motion.div>
          )}
          {currentStep === 2 && (
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
                duration: 0.5,
              }}
              className="flex flex-col gap-4"
            >
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
                              onFocus={() => setIsFocused(true)}
                              onBlur={(event) => {
                                // Prevent onBlur logic if the button is clicked
                                if (
                                  showPasswordButtonRef.current &&
                                  showPasswordButtonRef.current.contains(
                                    event.relatedTarget
                                  )
                                ) {
                                  return;
                                }
                                setIsFocused(false);
                              }}
                              value={field.value}
                              onChange={field.onChange}
                            />
                            {isFocused && (
                              <button
                                type="button"
                                ref={showPasswordButtonRef}
                                onClick={() => setShowPassword((show) => !show)}
                              >
                                {showPassword ? (
                                  <EyeOff className="text-brand" />
                                ) : (
                                  <EyeIcon className="text-brand" />
                                )}
                              </button>
                            )}
                          </div>
                        </FormControl>
                      </div>
                      <FormMessage className="shad-form-message" />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <div className="shad-form-item">
                        <FormLabel className="shad-form-label">
                          Password Confirm
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Password Confirm"
                            className="shad-input"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="shad-form-message" />
                    </FormItem>
                  );
                }}
              />
            </motion.div>
          )}

          {currentStep === 3 && (
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
                duration: 0.5,
              }}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <div className="shad-form-item">
                        <FormLabel className="shad-form-label">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Email Address"
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
            </motion.div>
          )}

          {/* for Buttons */}
          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button
                onClick={() =>
                  setCurrentStep((step) => (step < 0 ? step : step - 1))
                }
                type="button"
                className="form-submit-button grow"
              >
                Back
              </Button>
            )}
            {currentStep === 3 ? (
              <Button
                type="button"
                onClick={form.handleSubmit(handleSubmit)}
                className="form-submit-button grow-[3]"
                disabled={isLoading}
              >
                Sign up
                {isLoading &&
                  // loading animation here
                  ""}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => next()}
                className="form-submit-button grow-[3]"
              >
                Continue
              </Button>
            )}
          </div>
          <div className="body-2 flex justify-center">
            <p className="text-light-100">Already have an account?</p>
            <Link to={"/auth/login"} className="ml-1 font-medium text-brand">
              Login
            </Link>
          </div>
        </form>
      </Form>
      <p className="px-8 mt-4 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link
          to="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          to="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </>
  );
};

export default SignUp;
