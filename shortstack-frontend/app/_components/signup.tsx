"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Check } from "lucide-react";
import { Button } from "@/components/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Step = "signup" | "payment" | "complete";
type PaymentMethod = "card" | "mobile";

export default function MultiStepSignUp() {
  const [currentStep, setCurrentStep] = useState<Step>("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    mobileProvider: "",
    mobileNumber: "",
  });
  const [error, setError] = useState("");

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setCurrentStep("payment");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep("complete");
  };

  const steps = [
    { id: "signup", label: "Sign-up" },
    { id: "payment", label: "Payment info" },
    { id: "complete", label: "Get Started" },
  ];

  const mobileProviders = [
    { value: "mtn", label: "MTN" },
    { value: "telecel", label: "Telecel" },
    { value: "airteltigo", label: "AirtelTigo" },
    { value: "zeepay", label: "Zeepay" },
  ];

  return (
    <div className="h-screen bg-[#f5f2eb] relative overflow-hidden">
      {/* Background Elements (unchanged) */}
      <div className="absolute inset-0">
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
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                        currentStep === step.id
                          ? "bg-[#a24b33] text-white"
                          : step.id === "complete" && currentStep === "complete"
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      )}
                    >
                      {step.id === "complete" && currentStep === "complete" ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span className="text-sm mt-2">{step.label}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "h-[2px] w-16",
                        index < steps.findIndex((s) => s.id === currentStep)
                          ? "bg-[#a24b33]"
                          : "bg-gray-200"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg">
            {currentStep === "signup" && (
              <>
                <div className="space-y-4 text-center">
                  <h1 className="text-2xl font-bold">Create Account</h1>
                  <p className="text-gray-600">
                    Please fill in your details to create your account
                  </p>
                </div>

                <form onSubmit={handleSignUpSubmit} className="mt-8 space-y-6">
                  <div className="space-y-4">
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
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
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
                    {error && (
                      <p className="text-sm text-red-500 text-center">
                        {error}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#a24b33] hover:bg-[#a06b5d] text-white rounded-xl h-12"
                  >
                    Continue to Payment
                  </Button>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">
                        Or sign up with
                      </span>
                    </div>
                  </div>

                  {/* Google Sign Up Button Centered */}
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      className="rounded-xl w-full max-w-[300px]"
                      onClick={() => {
                        setCurrentStep("payment");
                      }}
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
              </>
            )}

            {currentStep === "payment" && (
              <>
                <div className="space-y-4 text-center">
                  <h1 className="text-2xl font-bold">Payment Information</h1>
                  <p className="text-gray-600">
                    Please select your payment method
                  </p>
                </div>

                <div className="mt-8 space-y-6">
                  <div className="flex justify-center space-x-4">
                    <Button
                      onClick={() => setPaymentMethod("card")}
                      className={cn(
                        "w-1/2",
                        paymentMethod === "card"
                          ? "bg-[#a24b33] text-white"
                          : "bg-gray-200 text-orange-700 hover:bg-[#a24b33]"
                      )}
                    >
                      Card
                    </Button>
                    <Button
                      onClick={() => setPaymentMethod("mobile")}
                      className={cn(
                        "w-1/2",
                        paymentMethod === "mobile"
                          ? "bg-[#a24b33] text-white"
                          : "bg-gray-200 text-orange-700 hover:bg-[#a24b33]"
                      )}
                    >
                      Mobile Money
                    </Button>
                  </div>

                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    {paymentMethod === "card" ? (
                      <>
                        <div>
                          <Input
                            placeholder="Card Number"
                            value={formData.cardNumber}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                cardNumber: e.target.value,
                              })
                            }
                            className="rounded-xl"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                expiryDate: e.target.value,
                              })
                            }
                            className="rounded-xl"
                            required
                          />
                          <Input
                            placeholder="CVV"
                            value={formData.cvv}
                            onChange={(e) =>
                              setFormData({ ...formData, cvv: e.target.value })
                            }
                            className="rounded-xl"
                            required
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <Select
                          value={formData.mobileProvider}
                          onValueChange={(value) =>
                            setFormData({ ...formData, mobileProvider: value })
                          }
                        >
                          <SelectTrigger className="w-full rounded-xl">
                            <SelectValue placeholder="Select Provider" />
                          </SelectTrigger>
                          <SelectContent>
                            {mobileProviders.map((provider) => (
                              <SelectItem
                                key={provider.value}
                                value={provider.value}
                              >
                                {provider.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          placeholder="Mobile Number"
                          value={formData.mobileNumber}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              mobileNumber: e.target.value,
                            })
                          }
                          className="rounded-xl"
                          required
                        />
                      </>
                    )}
                    <div className="bg-gray-100 p-4 rounded-xl">
                      <p className="text-lg font-semibold">Amount: $9.99</p>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-[#a24b33] hover:bg-[#a06b5d] text-white rounded-xl h-12"
                    >
                      Complete Payment
                    </Button>
                  </form>
                </div>
              </>
            )}

            {currentStep === "complete" && (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold">Welcome Aboard!</h1>
                  <p className="text-gray-600">
                    Your account has been successfully created
                  </p>
                </div>
                <Button
                  onClick={() => (window.location.href = "/dashboard")}
                  className="w-full bg-[#a24b33] hover:bg-[#a06b5d] text-white rounded-xl h-12"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
