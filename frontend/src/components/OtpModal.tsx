import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";

import React, { useContext, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { z } from "zod";
import { registerSchema } from "@/lib/schema";
import { AppContext } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";

type PropTypes = {
  setOtpModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  values: z.infer<typeof registerSchema>;
  setIsLoadingForm: React.Dispatch<React.SetStateAction<boolean>>;
  formReset: () => void;
};

const OtpModal = ({
  setOtpModalActive,
  email,
  values,
  setIsLoadingForm,
  formReset,
}: PropTypes) => {
  const context = useContext(AppContext);
  if (!context) return <p>Loading...</p>;
  const { setToken } = context;
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    sendOTP();
  }, [email]);

  async function sendOTP() {
    try {
      const res = await fetch("/api/send-otp", {
        method: "post",
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Something went wrong");
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    setIsLoadingForm(true);
    try {
      const payload = { email, otp: password };
      const resVerify = await fetch("/api/verify-otp", {
        method: "post",
        body: JSON.stringify(payload),
      });

      if (!resVerify.ok) {
        if (password.length !== 6) {
          setErrors((prevErrors) => [
            ...prevErrors,
            "OTP should be exactly 6 digits long.",
          ]);
          return;
        }
        throw new Error("Something went wrong");
      }

      const registerPayload = {
        ...values,
        id: 4679737499,
        user_type: "S",
        gender: "M",
        //birthday: 2024-12-31
      };
      const res = await fetch("/api/register", {
        method: "post",
        body: JSON.stringify(registerPayload),
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
            "Something went wrong with registering",
          ]);
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
        navigate("/dashboard");
      }
      handleCloseModal();
    } catch (error) {
      console.log(error);
    } finally {
      formReset();
      setIsLoading(false);
      setIsLoadingForm(false);
      handleCloseModal();
    }
  };

  const handleResendOTP = () => {
    sendOTP();
    setPassword("");
  };

  const handleCloseModal = () => {
    if (!isOpen) return;
    setOtpModalActive(false);
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleCloseModal}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="h2 text-center">
            Enter your OTP
            <img
              src="/assets/icons/close-dark.svg"
              alt="close"
              width={20}
              height={20}
              onClick={() => setIsOpen(false)}
              className="otp-close-button"
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="subtitle-2 text-center text-light-100">
            We've sent a code to{" "}
            <span className="pl-1 text-brand">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup className="shad-otp">
            <InputOTPSlot index={0} className="shad-otp-slot" />
            <InputOTPSlot index={1} className="shad-otp-slot" />
            <InputOTPSlot index={2} className="shad-otp-slot" />
            <InputOTPSlot index={3} className="shad-otp-slot" />
            <InputOTPSlot index={4} className="shad-otp-slot" />
            <InputOTPSlot index={5} className="shad-otp-slot" />
          </InputOTPGroup>
        </InputOTP>

        <AlertDialogFooter>
          <div className="flex w-full flex-col gap-4">
            <AlertDialogAction
              onClick={handleSubmit}
              className="shad-submit-btn h-12"
              type="button"
            >
              Submit
              {isLoading && (
                <img
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="ml-2 animate-spin"
                />
              )}
            </AlertDialogAction>

            <div className="subtitle-2 mt-2 text-center text-light-100">
              Didn't get a code?
              <Button
                type="button"
                variant="link"
                className="pl-1 text-brand"
                onClick={handleResendOTP}
              >
                Click to resend
              </Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OtpModal;
