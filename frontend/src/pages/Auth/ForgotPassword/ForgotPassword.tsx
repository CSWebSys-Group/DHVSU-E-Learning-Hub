import { forgotPasswordSchema } from "@/lib/schema";
import { useState, useEffect } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Notification } from "@/components/SlideInNotifications";

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

import {
  AnimatePresence,
  motion,
  useAnimationControls,
  Variants,
} from "framer-motion";

import { ArrowLeft, EyeIcon, EyeOff, LoaderCircle, X } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import OtpModal from "@/components/OtpModal";

// placeholders only
const steps = [
  {
    id: "1",
    name: "Email",
    fields: ["email"],
  },
  {
    id: "2",
    name: "Reset Password",
    fields: ["password", "password_confirm"],
  },
];

const ForgotPassword = () => {
  type FieldName = keyof z.infer<typeof forgotPasswordSchema>;

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // password states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [otpModalActive, setOtpModalActive] = useState(false);
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<
    { id: number; successMessage: string }[]
  >([]);

  const navigate = useNavigate();

  // Animation related
  const multiStepProgressBar = useAnimationControls();

  // Animation variants
  const progressBarVariants: Variants = {
    initial: { width: `${100 / steps.length}%` },
    animate: { width: `${((currentStep + 1) / steps.length) * 100}%` },
  };

  useEffect(() => {
    document.title = "Forgot Password | DHVSU E-Learning Hub";
  }, []);

  useEffect(() => {
    if (otpSuccess) {
      addNotification("OTP is correct");
      handleForgotPassword();
    }
  }, [otpSuccess]);

  useEffect(() => {
    if (errors.length > 0) {
      errors.forEach((e) => {
        addNotification(e);
      });
    }
  }, [errors]);

  useEffect(() => {
    multiStepProgressBar.start("animate");
  }, [currentStep, multiStepProgressBar]);

  const handleResetPassword = async () => {
    const fields = steps[currentStep].fields;
    const isStepValid = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    }); // Trigger validation for current step fields

    if (currentStep === 1) {
      if (
        isStepValid &&
        form.getValues("password") === form.getValues("password_confirmation")
      ) {
        // try and catch here
      } else {
        form.setError("password_confirmation", {
          type: "manual",
          message: "Passwords do not match",
        });
      }
    }
  };

  const next = async () => {
    const fields = steps[currentStep].fields;
    const isStepValid = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (currentStep === 0) {
      // OTP Verification here
      if (isStepValid) {
        setCurrentStep((step) => (step < steps.length - 1 ? step + 1 : step));
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      console.log(form.getValues());
      const res = await fetch("/api/send-otp/forgot-password", {
        method: "post",
        body: JSON.stringify({ email: form.getValues("email") }),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat() as string[];
          setErrors(errorMessages);
        }
      }
      setOtpModalActive(true);
    } catch (error) {
      console.log(error);
      setCurrentStep(0);
    } finally {
      setIsLoading(false);
    }
  };

  const addNotification = (message: string) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, successMessage: message }]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handleForgotPassword = async () => {
    try {
      const res = await fetch("/api/change-password", {
        method: "post",
        body: JSON.stringify({ ...form.getValues() }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat() as string[];
          setErrors(errorMessages);
        }
      }

      addNotification("Successfully changed password");
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
      setOtpModalActive(false);
      setOtpSuccess(false);
    } finally {
      form.reset();
      setCurrentStep(0);
      setIsLoading(false);
    }
  };

  return (
    <>
      {otpModalActive && (
        <OtpModal
          setOtpModalActive={setOtpModalActive}
          email={form.getValues("email")}
          setOtpSuccess={setOtpSuccess}
          type="forgot-password"
          setErrors={setErrors}
        />
      )}
      <Form {...form}>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div>
            <h1 className="form-title mb-3">Forgot Password</h1>
            <span className="text-light-100">
              No worries, we'll send you reset instructions.
            </span>
          </div>
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
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <div className="shad-form-item">
                        <FormLabel className="shad-form-label">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="eg. sample@dhvsu.edu.ph"
                            className="shad-input"
                            disabled={isLoading}
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
                              placeholder="Create a strong password"
                              className="shad-input"
                              type={showPassword ? "text" : "password"}
                              disabled={isLoading}
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
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center ">
                            <Input
                              placeholder="Re-enter your password"
                              className="shad-input"
                              type={showConfirmPassword ? "text" : "password"}
                              disabled={isLoading}
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword((show) => !show)
                              }
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="text-brand" />
                              ) : (
                                <EyeIcon className="text-brand" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                      </div>
                      <FormMessage className="shad-form-message">
                        {form.formState.errors.password_confirmation?.message}
                      </FormMessage>
                    </FormItem>
                  );
                }}
              />
            </motion.div>
          )}

          <div className="flex gap-2">
            {currentStep === 1 ? (
              <Button
                type="button"
                onClick={form.handleSubmit(handleSubmit)}
                className="form-submit-button grow-[3]"
                disabled={isLoading}
              >
                Reset Password
                {isLoading && (
                  <LoaderCircle size={24} className="ml-2 animate-spin" />
                )}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => next()}
                className="form-submit-button grow-[3]"
                disabled={isLoading}
              >
                Continue
              </Button>
            )}
          </div>

          <Link
            to={"/auth/login"}
            className="flex items-center justify-center text-light-100 gap-1.5 group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-all"
            />
            <span>Back to log in</span>
          </Link>
        </form>
      </Form>
      <div>
        <AnimatePresence>
          {notifications.map((notif) => (
            <Notification
              key={notif.id}
              id={notif.id}
              successMessage={notif.successMessage}
              removeNotif={removeNotification}
            />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ForgotPassword;
