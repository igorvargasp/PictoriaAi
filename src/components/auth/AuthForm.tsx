"use client";
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { Button } from "../ui/button";
import SignupForm from "./SignupForm";
import Link from "next/link";
import ResetPasswordForm from "./ResetPasswordForm";

const title = {
  login: "Login",
  reset: "Reset Password",
  signup: "Sign Up",
};

const subTitle = {
  login: "Enter your email below to login to your account.",
  reset:
    "Enter your email address and we'll send you a link to reset your password.",
  signup: "Enter your details below to create your account.",
};

const AuthForm = ({ state }: { state: "login" | "reset" | "signup" }) => {
  const [mode, setMode] = useState<"login" | "reset" | "signup">(state);

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{title[mode]}</h1>
        <p className="text-sm text-muted-foreground">{subTitle[mode]}</p>
      </div>
      {mode === "login" && (
        <>
          <LoginForm />
          <div className="text-center md:flex md:flex-row justify-between flex-col">
            <Button
              variant={"link"}
              className="p-0"
              onClick={() => setMode("signup")}
            >
              Need and account? Sign up
            </Button>
            <Button
              variant={"link"}
              className="p-0"
              onClick={() => setMode("reset")}
            >
              Forgot password?
            </Button>
          </div>
        </>
      )}
      {mode === "signup" && (
        <>
          <SignupForm />
          <div className="text-center">
            <Button
              variant={"link"}
              className="p-0"
              onClick={() => setMode("login")}
            >
              Already have an account? Login
            </Button>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By signing up, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </>
      )}
      {mode === "reset" && (
        <>
          <ResetPasswordForm />
          <div className="text-center">
            <Button
              variant={"link"}
              className="p-0"
              onClick={() => setMode("login")}
            >
              Back to Login
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthForm;
