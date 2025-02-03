"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, X, QrCode, FileText, Link2 } from "lucide-react";
import Link from "next/link";

export default function DashboardHome() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="p-6 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Shorten, Share and Simplify
            </h1>
            <Alert className="w-auto bg-cyan-50 border-cyan-200">
              <Sparkles className="h-4 w-4 text-cyan-500" />
              <AlertDescription className="text-cyan-600">
                Did you know? A group of flamingos is called a "flamboyance."{" "}
                <a
                  href="#"
                  className="text-cyan-600 underline underline-offset-2"
                >
                  Learn more
                </a>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-0 flex">
              <div className="w-32 h-full bg-[#ebd4cd] flex items-center justify-center p-6">
                <div className="relative">
                  <div className="absolute -left-4 -top-1">
                    <div className="bg-white border rounded px-2 py-1 text-sm">
                      <span className="text-sm">shortstack.co/link</span>
                    </div>
                  </div>
                  <Link2 className="w-20 h-20 text-[#a24b33]" />
                </div>
              </div>
              <div className="border-l flex-1 p-6">
                <h2 className="text-xl font-semibold mb-4">Make it short</h2>
                <Link href="/dashboard/link">
                  <Button variant="outline" className="gap-2">
                    <QrCode className="h-4 w-4" />
                    Go to Links
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0 flex">
              <div className="w-32 h-full bg-[#ebd4cd] flex items-center justify-center p-6">
                <div className="relative">
                  <div className="absolute -left-4 -top-1">
                    <div className="bg-white border rounded px-2 py-1 text-sm">
                      bit.ly/
                    </div>
                  </div>
                  <QrCode className="w-20 h-20 text-[#a24b33]" />
                </div>
              </div>
              <div className="border-l flex-1 p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Make it scannable
                </h2>
                <Button variant="outline" className="gap-2">
                  <QrCode className="h-4 w-4" />
                  Go to Codes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0 flex">
              <div className="w-32 h-full bg-[#ebd4cd] flex items-center justify-center p-6">
                <FileText className="w-20 h-20 text-[#a24b33]" />
              </div>
              <div className="border- flex-1 p-6">
                <h2 className="text-xl font-semibold mb-4">Make a page</h2>
                <Button variant="outline" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Go to Pages
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Value Proposition */}
        <div className="bg-white p-6 rounded-lg border relative">
          <Button variant="ghost" size="sm" className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </Button>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-[#ebd4cd] flex items-center justify-center">
              <svg
                className="w-4 h-4 text-[#a24b33]"
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
              <h2 className="text-xl font-semibold mb-2">
                Bring people to your content
              </h2>
              <p className="text-gray-600">
                Create and share unique links and QR Codes to attract attention,
                connect with more followers, and drive traffic to your content.
              </p>
            </div>
          </div>
        </div>

        {/* Getting Started Section */}
        <div className="grid md:grid-cols-2 gap-8"></div>
      </div>
    </div>
  );
}
