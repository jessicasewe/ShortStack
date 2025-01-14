"use client";
import { Navbar } from "@/app/_components/navbar";
import SignUpPage from "@/app/_components/signup";

export default function Pricing() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white">
      <Navbar />
      <SignUpPage />
    </div>
  );
}
