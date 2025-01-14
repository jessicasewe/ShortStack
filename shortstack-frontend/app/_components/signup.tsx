"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(false); // State to toggle between Login and Sign Up

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login
    } else {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      setError("");
      // Handle sign up
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(""); // Reset error when toggling forms
    setFormData({ name: "", email: "", password: "", confirmPassword: "" }); // Reset form data
  };

  return (
    <div className="h-screen bg-[#f5f2eb] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0">
        {/* Squiggly Lines */}
        <svg
          className="absolute top-20 left-20"
          width="100"
          height="30"
          viewBox="0 0 100 30"
        >
          <path
            d="M0 15 Q 25 0, 50 15 T 100 15"
            fill="none"
            stroke="#000"
            strokeWidth="1"
          />
        </svg>
        <svg
          className="absolute top-20 right-20"
          width="100"
          height="30"
          viewBox="0 0 100 30"
        >
          <path
            d="M0 15 Q 25 0, 50 15 T 100 15"
            fill="none"
            stroke="#000"
            strokeWidth="1"
          />
        </svg>

        {/* Polka Dot Rectangles */}
        <div
          className="absolute bottom-20 left-40 w-20 h-40 bg-[#ffd7ba] rounded-sm"
          style={{
            backgroundImage:
              "radial-gradient(circle, #000 2px, transparent 2px)",
            backgroundSize: "15px 15px",
          }}
        />
        <div
          className="absolute bottom-20 right-40 w-20 h-40 bg-[#ffd7ba] rounded-sm"
          style={{
            backgroundImage:
              "radial-gradient(circle, #000 2px, transparent 2px)",
            backgroundSize: "15px 15px",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md mt-[-10vh]">
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="space-y-4 text-center">
              <h1 className="text-2xl font-bold">
                {isLogin ? "Log In" : "Create Account"}
              </h1>
              <p className="text-gray-600">
                {isLogin
                  ? "Please enter your email and password to log in"
                  : "Please fill in your details to create your account"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="space-y-4">
                {!isLogin && (
                  <div>
                    <Input
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="rounded-xl"
                      required
                    />
                  </div>
                )}
                <div>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="rounded-xl"
                    required
                  />
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="rounded-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {!isLogin && (
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="rounded-xl"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                )}
                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-[#ffd7ba] hover:bg-[#ffc59e] text-black rounded-xl h-12"
              >
                {isLogin ? "Log In" : "Sign Up"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">
                    Or {isLogin ? "Log In" : "Sign Up"} with
                  </span>
                </div>
              </div>

              {/* Google Sign Up Button Centered */}
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  className="rounded-xl w-full max-w-[300px]"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Sign up with Google
                </Button>
              </div>
            </form>

            <div className="mt-4 text-center text-sm">
              <p>
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  onClick={toggleForm}
                  className="font-medium text-[#774a29] hover:text-[#ff9e4e]"
                >
                  {isLogin ? "Sign Up" : "Log In"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
