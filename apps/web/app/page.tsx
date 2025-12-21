"use client";

import { AppFormSignIn, AppFormSignUp } from "@/components/organism";
import { cn } from "@repo/ui/utils";
import Image from "next/image";
import { useState } from "react";

export default function AuthPage() {
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const isSignIn = mode === "signIn";

  return (
    <div
      className={cn(
        "flex min-h-svh overflow-hidden",
        "items-center justify-center",
        // Mobile: no padding, Desktop: use padding
        "py-0 sm:py-8",
        // Desktop: use bg, Mobile: no bg (using media query for no flash)
        "sm:bg-gray-50 sm:dark:bg-background"
      )}
    >
      <div
        className={cn(
          "w-full sm:w-4/5 max-w-6xl",
          // Desktop only: grid, shadow, rounded
          "sm:grid sm:grid-cols-1 md:grid-cols-2 sm:rounded-2xl sm:shadow-2xl sm:dark:shadow-gray-900"
        )}
      >
        {/* Form Section */}
        <div
          className={cn(
            "flex flex-col gap-3 sm:gap-5 px-4 sm:px-10 py-4 sm:py-8",
            "justify-center min-h-svh sm:min-h-0",
            // Desktop only: bg and rounded
            "sm:bg-white sm:dark:bg-sidebar sm:rounded-l-2xl md:rounded-r-none"
          )}
        >
          {/* Desktop: Logo + Link in header */}
          <div className="hidden sm:flex justify-between items-center shrink-0">
            <Image
              src={"/images/bnn-logo.png"}
              width={50}
              height={50}
              alt="Logo BNN"
            />
            <p className="text-xs sm:text-sm">
              {isSignIn ? "Belum punya akun? " : "Sudah punya akun? "}
              <button
                type="button"
                onClick={() => setMode(isSignIn ? "signUp" : "signIn")}
                className="text-blue-500 hover:underline hover:underline-offset-2 ml-1 cursor-pointer"
              >
                {isSignIn ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>

          {/* Mobile: Logo centered on above form */}
          <div className="flex sm:hidden justify-center mb-2">
            <Image
              src={"/images/bnn-logo.png"}
              width={60}
              height={60}
              alt="Logo BNN"
            />
          </div>

          {isSignIn ? (
            <AppFormSignIn />
          ) : (
            <AppFormSignUp onRegisterSuccess={() => setMode("signIn")} />
          )}

          <p className="text-xs sm:text-sm sm:hidden text-center">
            {isSignIn ? "Belum punya akun? " : "Sudah punya akun? "}
            <button
              type="button"
              onClick={() => setMode(isSignIn ? "signUp" : "signIn")}
              className="text-blue-500 hover:underline hover:underline-offset-2 ml-1 cursor-pointer"
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>

        {/* Image Section - Desktop only */}
        <div className="relative hidden md:block">
          <Image
            src={
              isSignIn
                ? "/images/kantor-signin.jpg"
                : "/images/kantor-signup.jpg"
            }
            alt="Office"
            fill
            className="object-cover rounded-r-2xl"
          />
        </div>
      </div>
    </div>
  );
}
