"use client";
import { Navbar } from "@/app/_components/navbar";
import PricingPlans from "@/app/_components/pricing-plan";

export default function Pricing() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white">
      <Navbar />
      <PricingPlans />
    </div>
  );
}
