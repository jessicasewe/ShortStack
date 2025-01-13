"use client";

import { useState } from "react";
import { Eye, EyeOff, Link2, QrCode } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { Button } from "@/components/button";
import { Input } from "@/components/ui/input";

export default function URLTools() {
  const [longUrl, setLongUrl] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [password, setPassword] = useState("");
  const [showpassword, setshowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#a24b33] to-[#a06b5d] py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Tabs defaultValue="shortlink" className="w-full">
          <TabsList className="grid w-full grid-cols-2 gap-4 mb-8 bg-transparent p-0">
            <TabsTrigger
              value="shortlink"
              className="gap-2 text-lg data-[state=active]:bg-white data-[state=active]:text-[#001233] data-[state=inactive]:bg-transparent data-[state=inactive]:text-white rounded-2xl border-2 border-white p-4"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-[#fed7aa]"
              >
                <path
                  d="M16 8l-8 8M8 8h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Short link
            </TabsTrigger>
            <TabsTrigger
              value="qrcode"
              className="gap-2 text-lg data-[state=active]:bg-white data-[state=active]:text-[#001233] data-[state=inactive]:bg-transparent data-[state=inactive]:text-white rounded-2xl border-2 border-white p-4"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-[#fed7aa]"
              >
                <rect
                  x="3"
                  y="3"
                  width="7"
                  height="7"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <rect
                  x="14"
                  y="3"
                  width="7"
                  height="7"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <rect
                  x="3"
                  y="14"
                  width="7"
                  height="7"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M14 14H21V17H14V14Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M14 19H21V21H14V19Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              QR Code
            </TabsTrigger>
          </TabsList>

          <TabsContent value="shortlink">
            <div className="bg-white rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-[#001233] mb-2">
                Shorten a long link
              </h2>
              <p className="text-gray-600 mb-8">No credit card required.</p>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="longUrl"
                    className="text-lg font-semibold text-[#001233] mb-2 block"
                  >
                    Paste your long link here
                  </label>
                  <Input
                    id="longUrl"
                    type="url"
                    placeholder="https://example.com/my-long-url"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    className="w-full p-6 text-lg rounded-xl border-gray-400 bg-white"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="passwordProtected"
                      type="checkbox"
                      checked={isPasswordProtected}
                      onChange={() =>
                        setIsPasswordProtected(!isPasswordProtected)
                      }
                      className="mr-2"
                    />
                    <label
                      htmlFor="passwordProtected"
                      className="text-lg text-[#001233]"
                    >
                      Password protect this URL
                    </label>
                  </div>
                  {isPasswordProtected && (
                    <div className="relative">
                      <Input
                        id="password"
                        type={showpassword ? "text" : "password"}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-6 text-lg rounded-xl border-gray-400 bg-white pr-12"
                      />
                      <button
                        type="button"
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setshowPassword(!showpassword)}
                      >
                        {showpassword ? (
                          <EyeOff size={24} />
                        ) : (
                          <Eye size={24} />
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <Button
                  size="lg"
                  className="w-full md:w-auto bg-[#a24b33] hover:bg-[#a06b5d] text-lg px-8 py-6 rounded-xl"
                >
                  Get your link for free
                  <span className="ml-2">→</span>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="qrcode">
            <div className="bg-white rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-[#001233] mb-2">
                Create a QR Code
              </h2>
              <p className="text-gray-600 mb-8">
                Generate QR codes for your links instantly.
              </p>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="qrUrl"
                    className="text-lg font-semibold text-[#001233] mb-2 block"
                  >
                    Enter your URL
                  </label>
                  <Input
                    id="qrUrl"
                    type="url"
                    placeholder="https://example.com"
                    value={qrUrl}
                    onChange={(e) => setQrUrl(e.target.value)}
                    className="w-full p-6 text-lg rounded-xl border-gray-200"
                  />
                </div>
                <Button
                  size="lg"
                  className="w-full md:w-auto bg-[#a24b33] hover:bg-[#a06b5d] text-lg px-8 py-6 rounded-xl"
                >
                  Generate QR Code
                  <span className="ml-2">→</span>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
