"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Eye,
  ArrowRight,
  Lock,
  Mail,
  Key,
  Fingerprint,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SignIn } from "@/app/actions/sign-in";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });
  const router = useRouter();

  const handleSignIn = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      toast.error("Missing required fields");
      return;
    }

    const loginResponse = async () => {
      try {
        await SignIn(formData);
      } catch (error: unknown) {
        throw error;
      }
    };

    toast.promise(loginResponse(), {
      loading: "Logging in...",
      success: () => {
        router.push("/dashboard");
        return "Welcome to your Shortstack dashboard!";
      },
      error: (error) => {
        return error?.message;
      },
    });
  };

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      console.log("Storage changed:", event);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="min-h-screen bg-[#fff8f5]">
      <div className="flex min-h-screen">
        <div className="hidden lg:flex lg:w-1/2 relative p-12">
          <div className="relative w-full">
            <div className="absolute inset-0 bg-gradient-to-b from-[#fff8f5] to-[#ffe8d9] rounded-3xl" />
            <div className="relative h-full flex items-center justify-center overflow-hidden">
              <div className="w-full max-w-md p-8 relative">
                {/* Central Lock Icon */}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-48 h-48 bg-white rounded-full shadow-lg flex items-center justify-center"
                  initial={{ x: "-50%", y: "-50%", scale: 1 }}
                  animate={{
                    x: ["-50%", "-55%", "-50%", "-45%", "-50%"],
                    y: ["-50%", "-55%", "-50%", "-45%", "-50%"],
                    scale: [1, 1.05, 1, 0.95, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Lock className="w-24 h-24 text-[#a24b33]" />
                </motion.div>

                <motion.div
                  className="absolute top-1/4 left-1/4 w-16 h-16 bg-[#fff8f5] rounded-full flex items-center justify-center"
                  animate={{
                    x: [0, 50, 0],
                    y: [0, -25, 0],
                    rotate: [0, 360, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Shield className="w-8 h-8 text-red-400" />
                </motion.div>

                <motion.div
                  className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"
                  animate={{
                    x: [0, -50, 0],
                    y: [0, 25, 0],
                    rotate: [0, -360, 0],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Key className="w-8 h-8 text-green-500" />
                </motion.div>

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
                    <Fingerprint className="w-4 h-4" />
                    <span className="text-sm font-medium">Secure Login</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-12 py-24">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Welcome Back
                <span className="relative inline-block ml-2">
                  <div className="absolute -right-6 top-2">
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-orange-200" />
                      <div className="w-3 h-3 rounded-full bg-green-200" />
                      <div className="w-3 h-3 rounded-full bg-purple-200" />
                    </div>
                  </div>
                </span>
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Please enter your credentials to access your account
              </p>
            </div>

            <form
              action={async (formData) => handleSignIn(formData)}
              className="space-y-6"
            >
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  id="email"
                  required
                  className="rounded-xl bg-white border-gray-200 pl-10"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  required
                  id="password"
                  className="rounded-xl bg-white border-gray-200 pl-10 pr-10"
                />
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <Eye className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#a24b33] focus:ring-[#a24b33] border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-[#a24b33] hover:text-[#a24b33]"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#a24b33] hover:bg-[#a84f37] text-white rounded-full h-12 flex items-center justify-center gap-2 group"
              >
                Log in
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <p className="text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="text-[#a24b33] hover:text-[#a84f37] underline underline-offset-4"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
