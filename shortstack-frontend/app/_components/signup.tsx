"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createUser } from "@/lib/users";
import { SignIn } from "../actions/sign-in";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const data = { firstName, lastName, email, password, confirmPassword };
    const loginFromData = new FormData();
    loginFromData.append("firstName", firstName);
    loginFromData.append("lastName", lastName);
    loginFromData.append("email", email);
    loginFromData.append("password", password);
    loginFromData.append("confirmPassword", confirmPassword);

    const signUpResponse = async () => {
      try {
        const response = await createUser(data);

        if (response?.status !== 201) {
          throw new Error("Signup failed. Please try again.");
        }

        await SignIn(loginFromData);
      } catch (error: unknown) {
        throw error;
      }
    };

    toast.promise(signUpResponse(), {
      loading: "Creating account...",
      success: () => {
        router.push("/dashboard/");
        return "Account created successfully";
      },
      error: (error) => {
        return error?.message;
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#fff8f5]">
      <div className="flex min-h-screen">
        <div className="hidden lg:flex lg:w-1/2 relative p-12">
          <div className="relative w-full">
            <div className="absolute inset-0 bg-gradient-to-b from-[#fff8f5] to-[#ffe8d9] rounded-3xl" />
            <div className="relative h-full flex items-center justify-center overflow-hidden">
              <div className="w-full max-w-md p-8 relative">
                <motion.div
                  className="absolute top-1/2 left-1/2 w-48 h-48 bg-white rounded-2xl shadow-lg p-4"
                  initial={{ x: "-50%", y: "-50%", rotate: 0 }}
                  animate={{
                    x: "-50%",
                    y: ["-50%", "-55%", "-50%", "-45%", "-50%"],
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <rect
                      x="10"
                      y="10"
                      width="80"
                      height="80"
                      fill="none"
                      stroke="black"
                      strokeWidth="2"
                    />
                    <path
                      d="M20 20h20v20H20z M60 20h20v20H60z M20 60h20v20H20z"
                      fill="black"
                    />
                    <path
                      d="M50 50h10v10H50z M70 50h10v10H70z M50 70h10v10H50z"
                      fill="black"
                    />
                  </svg>
                </motion.div>

                {/* Floating Link Cards */}
                <motion.div
                  className="absolute top-1/4 left-1/4 w-32 h-20 bg-white rounded-xl shadow-lg p-4"
                  animate={{
                    x: [0, 100, 0],
                    y: [0, -35, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-full h-3 bg-orange-200 rounded mb-2" />
                  <div className="w-2/3 h-3 bg-orange-100 rounded" />
                </motion.div>

                <motion.div
                  className="absolute bottom-1/4 right-1/4 w-32 h-20 bg-white rounded-xl shadow-lg p-4"
                  animate={{
                    x: [0, -100, 0],
                    y: [0, 15, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-full h-3 bg-purple-200 rounded mb-2" />
                  <div className="w-2/3 h-3 bg-purple-100 rounded" />
                </motion.div>

                {/* Floating Icons */}
                <motion.div
                  className="absolute top-1/3 right-1/3 w-12 h-12 bg-orange-400/20 rounded-full p-2"
                  animate={{
                    rotate: 360,
                    x: [0, 100, 0, -100, 0],
                    y: [0, 30, 60, 30, 0],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <svg
                    className="w-full h-full text-orange-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </motion.div>

                <motion.div
                  className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-purple-400/20 rounded-full p-2"
                  animate={{
                    rotate: -360,
                    x: [0, 100, 0, -100, 0],
                    y: [0, 30, 60, 30, 0],
                  }}
                  transition={{
                    duration: 25,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <svg
                    className="w-full h-full text-purple-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M8 12h8" />
                    <path d="M12 8v8" />
                  </svg>
                </motion.div>

                {/* Floating Dots */}
                <motion.div
                  className="absolute top-1/4 right-1/3 w-4 h-4 bg-green-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-orange-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
                <motion.div
                  className="absolute top-2/3 right-1/2 w-4 h-4 bg-purple-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 2,
                  }}
                />

                {/* Digital Presence Label */}
                <motion.div
                  className="absolute bottom-12 left-12"
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#a24b33] text-white rounded-full">
                    <span className="text-sm font-medium">shortstack</span>
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-12 py-24">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Shorten, Share and{" "}
                <span className="relative inline-block">
                  Simplify
                  <div className="absolute -right-6 top-2">
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-green-200" />
                      <div className="w-3 h-3 rounded-full bg-orange-200" />
                      <div className="w-3 h-3 rounded-full bg-purple-200" />
                    </div>
                  </div>
                </span>
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Please fill in your details to create an account
              </p>
            </div>

            <form
              action={async (formData) => handleSubmit(formData)}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="First Name"
                  name="firstName"
                  id="firstName"
                  required
                  className="rounded-xl bg-white border-gray-200"
                />
                <Input
                  placeholder="Last name"
                  name="lastName"
                  id="lastName"
                  required
                  className="rounded-xl bg-white border-gray-200"
                />
              </div>

              <Input
                type="email"
                placeholder="E-mail"
                name="email"
                id="email"
                required
                className="rounded-xl bg-white border-gray-200"
              />

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  id="password"
                  required
                  className="rounded-xl bg-white border-gray-200 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  name="confirmPassword"
                  id="confirmPassword"
                  required
                  className="rounded-xl bg-white border-gray-200 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#a24b33] hover:bg-[#a84f37] text-white rounded-full h-12 flex items-center justify-center gap-2 group"
              >
                Create account
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-[#a24b33] underline underline-offset-4"
                >
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
