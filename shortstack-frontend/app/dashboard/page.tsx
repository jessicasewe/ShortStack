"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, X, QrCode, FileText, Link2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";

export default function DashboardHome() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const [joke, setJoke] = useState("");
  const [showFullJoke, setShowFullJoke] = useState(false);
  const toggleJoke = () => setShowFullJoke(!showFullJoke);
  const truncatedJoke =
    joke.length > 100 ? joke.substring(0, 100) + "..." : joke;

  // Fetch a joke (for fun)
  useEffect(() => {
    const fetchJoke = async () => {
      try {
        const response = await fetch(
          "https://v2.jokeapi.dev/joke/Any?type=single&format=json&amount=1&max-length=100"
        );
        const data = await response.json();
        setJoke(data.joke || "Humor is on a break right now!");
      } catch (error) {
        console.error("Failed to fetch joke:", error);
        setJoke(
          "Why don’t skeletons fight each other? They don’t have the guts."
        );
      }
    };

    fetchJoke();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 bg-white border-b shadow-sm"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-xl font-bold text-gray-900">Your Link Hub</h1>
            <Alert className="w-auto bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200 shadow-md">
              <Sparkles className="h-4 w-4 text-cyan-500" />
              <AlertDescription className="text-cyan-700">
                <motion.div
                  initial={{ maxHeight: 20, overflow: "hidden" }}
                  animate={{ maxHeight: showFullJoke ? "auto" : 40 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block"
                >
                  {joke}
                </motion.div>
                {joke.length > 100 && (
                  <button
                    onClick={toggleJoke}
                    className="ml-2 text-cyan-700 font-semibold hover:text-cyan-900 transition-colors duration-200"
                  >
                    {showFullJoke ? "Show less" : "Learn more"}
                  </button>
                )}
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Make it short",
              icon: Link2,
              href: "/dashboard/link",
              color: "from-[#ebd4cd] to-[#f0e0da]",
            },
            {
              title: "Make it scannable",
              icon: QrCode,
              href: "/dashboard/qr-code",
              color: "from-[#ebd4cd] to-[#f0e0da]",
            },
            {
              title: "Make a page",
              icon: FileText,
              href: "/dashboard/pgge",
              color: "from-[#ebd4cd] to-[#f0e0da]",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0 flex">
                  <div
                    className={`w-32 h-full bg-gradient-to-br ${item.color} flex items-center justify-center p-6`}
                  >
                    <div className="relative">
                      <div className="absolute -left-4 -top-1">
                        <div className="bg-white border rounded px-2 py-1 text-sm shadow-sm">
                          <span className="text-sm">
                            shortstack.co/{item.title.split(" ")[2]}
                          </span>
                        </div>
                      </div>
                      <item.icon className="w-20 h-20 text-[#a24b33]" />
                    </div>
                  </div>
                  <div className="border-l flex-1 p-6">
                    <h2 className="text-xl font-semibold mb-4">{item.title}</h2>
                    <Link href={item.href}>
                      <Button
                        variant="outline"
                        className="gap-2 hover:bg-[#ebd4cd] hover:text-[#a24b33] transition-colors duration-200"
                      >
                        <item.icon className="h-4 w-4" />
                        Go to {item.title.split(" ")[2]}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg border relative shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <Button variant="ghost" size="sm" className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </Button>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ebd4cd] to-[#f0e0da] flex items-center justify-center shadow-inner">
              <svg
                className="w-6 h-6 text-[#a24b33]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                Bring people to your content
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Create and share unique links and QR Codes to attract attention,
                connect with more followers, and drive traffic to your content.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
