"use client";

import { useContext, useEffect, useState } from "react";

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
import { AppContext } from "@/context/AppContext";
import OtpModal from "@/components/OtpModal";

// TODO: Paganahin yung animation sa mga button (Back, Continue) buttons.
// TODO: Display the name for each form. (Personal Information and such)

const steps = [
  {
    id: "1",
    name: "Personal Information",
    fields: ["fn", "ln"],
  },
  {
    id: "2",
    name: "Create a strong password",
    fields: ["password", "confirmPassword"],
  },
  {
    id: "3",
    name: "Please enter your DHVSU email",
    fields: ["email"],
  },
];

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const prevButtonAnimControls = useAnimationControls();
  const multiStepProgressBar = useAnimationControls();
  const [otpModalActive, setOtpModalActive] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fn: "",
      ln: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const prevButtonVariants: Variants = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
  };

  const progressBarVariants: Variants = {
    initial: { width: `${100 / steps.length}%` },
    animate: { width: `${((currentStep + 1) / steps.length) * 100}%` },
  };

  const formReset = () => {
    form.reset();
    setCurrentStep(0);
  };

  // Getting the form data (this function's purpose is to send the data to the api e.g localhost:8000/api/users)
  const handleSubmit = async () => {
    setIsLoading(true);
    setOtpModalActive(true);
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

  // TODO: DI NAGANA
  // useEffect(() => {
  //   if (currentStep === 1) {
  //     prevButtonAnimControls.set('initial'); // Reset to initia
  //     prevButtonAnimControls.start('animate'); // Then start
  //   }
  // }, [currentStep, prevButtonAnimControls]);

  useEffect(() => {
    multiStepProgressBar.start("animate");
  }, [currentStep, multiStepProgressBar]);

  return (
    <>
      {otpModalActive && (
        <OtpModal
          setOtpModalActive={setOtpModalActive}
          values={form.getValues()}
          email={form.getValues("email")}
          setIsLoadingForm={setIsLoading}
          formReset={formReset}
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
            {currentStep === 2 ? (
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
    </>
  );
};

export default SignUp;
