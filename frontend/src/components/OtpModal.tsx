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

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { LoaderCircle, X } from "lucide-react";

type PropTypes = {
  setOtpModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  setOtpSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
  fullName: string;
};

const OtpModal = ({
  setOtpModalActive,
  email,
  setOtpSuccess,
  setErrors,
  fullName,
}: PropTypes) => {
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function sendOTP() {
    try {
      const res = await fetch("/api/send-otp", {
        method: "post",
        body: JSON.stringify({ email, fullName }),
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
      handleCloseModal();
    }
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = { email, otp: password };
      const resVerify = await fetch("/api/verify-otp", {
        method: "post",
        body: JSON.stringify(payload),
      });

      if (!resVerify.ok) {
        if (password.length !== 6) {
          throw new Error("OTP should be exactly 6 digits long.");
        }
        throw new Error("Something went wrong");
      }
      setOtpSuccess(true);
    } catch (error) {
      console.log(error);
      setOtpSuccess(false);
    } finally {
      setIsLoading(false);
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
            <X
              size={20}
              className="otp-close-button"
              onClick={handleCloseModal}
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
                <LoaderCircle size={24} className="ml-2 animate-spin" />
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
