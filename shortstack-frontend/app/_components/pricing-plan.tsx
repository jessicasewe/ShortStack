"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { Check } from "lucide-react";
import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function PricingPlans() {
  const [isAnnual, setIsAnnual] = useState(false);
  const router = useRouter(); // Initialize router

  const plans = [
    {
      name: "Free",
      price: "0",
      description: "For your hobby projects",
      features: [
        "Free e-mail alerts",
        "3-minute checks",
        "Automatic data enrichment",
        "10 monitors",
        "Up to 3 seats",
      ],
    },
    {
      name: "Pro",
      isPopular: true,
      price: 10, // Monthly price is $10
      description: "Great for small businesses",
      features: [
        "Unlimited phone calls",
        "30 second checks",
        "Single-user account",
        "20 monitors",
        "Up to 6 seats",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For multiple teams",
      features: [
        "Everything in Pro",
        "Up to 5 team members",
        "20 monitors",
        "15 status pages",
        "200+ integrations",
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold">Plans and Pricing</h2>
        <p className="text-muted-foreground">
          Shorten links, generate QR codes, and share instantly—all in one
          place.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          {/* Monthly Option */}
          <span className={!isAnnual ? "font-medium" : "text-muted-foreground"}>
            Monthly
          </span>

          <div
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition 
                        ${
                          isAnnual ? "bg-primary" : "bg-gray-300"
                        } border border-gray-400`}
            onClick={() => setIsAnnual(!isAnnual)}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300
                          ${isAnnual ? "translate-x-6" : "translate-x-0"}`}
            />
          </div>

          <span className={isAnnual ? "font-medium" : "text-muted-foreground"}>
            Annual
            <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-full bg-[#ffdebe]">
              Save 35%
            </span>
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <Card
            key={plan.name}
            className={`relative flex flex-col ${
              index === 2 ? "bg-[#ffdebe] text-black" : ""
            }`}
          >
            <CardHeader>
              <div className="space-y-2">
                {plan.isPopular && (
                  <span className="text-xs font-medium bg-orange-100 text-orange-600 px-2 py-0.5 rounded">
                    Recommended
                  </span>
                )}
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">
                    $
                    {typeof plan.price === "number"
                      ? isAnnual
                        ? (plan.price * 12 * 0.65).toFixed(0)
                        : plan.price
                      : plan.price}
                  </span>
                  {plan.price !== "Custom" && (
                    <span className="text-sm text-muted-foreground">
                      per seat/month, billed {isAnnual ? "annually" : "monthly"}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button
                className={`w-full ${
                  index === 2
                    ? "bg-white text-[#a24b33] border-[#a24b33] hover:bg-[#f6a42c] hover:text-black"
                    : "bg-[#ffdebe] text-black hover:bg-[#f6a42c]/90"
                }`}
                onClick={() => {
                  if (plan.name === "Pro") {
                    router.push("/auth/signup");
                  } else if (plan.name === "Free") {
                    router.push("/#url-tools");
                  }
                }}
              >
                Get started
                {plan.name !== "Free" ? ` with ${plan.name}` : " for free"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
