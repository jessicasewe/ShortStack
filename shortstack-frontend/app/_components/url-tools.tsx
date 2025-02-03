"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Clipboard } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { Button } from "@/components/button";
import { Input } from "@/components/ui/input";
import QRCode from "qrcode";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const colors = [
  { id: "black", value: "#000000" },
  { id: "red", value: "#EF4444" },
  { id: "orange", value: "#F97316" },
  { id: "green", value: "#22C55E" },
  { id: "light-blue", value: "#3B82F6" },
  { id: "blue", value: "#2563EB" },
  { id: "purple", value: "#7C3AED" },
  { id: "pink", value: "#EC4899" },
];

function Star({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={`w-4 h-4 ${className}`}
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
}

export default function URLTools() {
  const [longUrl, setLongUrl] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [password, setPassword] = useState("");
  const [showpassword, setshowPassword] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const originalUrl = longUrl;
  const [qrGenerated, setQrGenerated] = useState(false);
  const [qrColor, setQrColor] = useState("#000000");

  const handleShortenUrl = async () => {
    try {
      console.log("Sending request with data:", { originalUrl, password });

      const response = await fetch("http://localhost:5000/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalUrl: originalUrl,
          password: isPasswordProtected ? password : undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.msg === "This URL is already shortened.") {
          toast.info("URL Already Shortened", {
            description:
              "This URL has already been shortened. Here's your existing short URL.",
            action: {
              label: "Copy",
              onClick: () => navigator.clipboard.writeText(data.shortUrl),
            },
          });
        } else {
          toast.success("URL Shortened Successfully", {
            description: "Your URL has been shortened successfully!",
            action: {
              label: "Copy",
              onClick: () => navigator.clipboard.writeText(data.shortUrl),
            },
          });
        }
        setShortenedUrl(data.shortUrl);
      } else {
        toast.error("Error Shortening URL", {
          description:
            data.msg || "An error occurred while shortening the URL.",
        });
      }
    } catch (error) {
      toast.error("Request Failed", {
        description: "Failed to connect to the server. Please try again later.",
      });
      console.error("Request failed:", error);
    }
  };

  const handleGenerateQR = async () => {
    if (qrUrl.trim() !== "") {
      try {
        const options = {
          color: {
            dark: qrColor,
          },
          margin: 2,
          width: 200,
        };

        const dataUrl = await QRCode.toDataURL(qrUrl, options);
        setQrCodeDataUrl(dataUrl);
        setQrGenerated(true);
      } catch (error) {
        console.error("Failed to generate QR code:", error);
      }
    } else {
      alert("Please enter a valid URL");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
    alert("Shortened URL copied to clipboard!");
  };

  const stars = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    scale: Math.random() * 1.5 + 1.6,
    opacity: Math.random() * 0.3 + 0.1,
  }));

  return (
    <div
      id="url-tools"
      className="min-h-screen bg-gradient-to-b from-[#a24b33] to-[#a06b5d] py-20 px-4 relative overflow-hidden"
    >
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          initial={{ opacity: 0 }}
          animate={{
            opacity: star.opacity,
            scale: [star.scale, star.scale * 1.2, star.scale],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: Math.random() * 2,
          }}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
        >
          <Star className="text-gray-200" />
        </motion.div>
      ))}

      <div className="max-w-3xl mx-auto relative z-10">
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
              <p className="text-gray-600 mb-8">Shorten your URL with ease.</p>
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
                {shortenedUrl && (
                  <div className="mt-4">
                    <label
                      htmlFor="shortenedUrl"
                      className="text-lg font-semibold text-[#001233] mb-2 block"
                    >
                      Your shortened URL:
                    </label>
                    <div className="flex items-center space-x-2">
                      <a
                        href="#"
                        onClick={() => setShowPasswordPrompt(true)}
                        className="text-[#a24b33] underline"
                      >
                        {shortenedUrl}
                      </a>
                      <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700"
                        onClick={handleCopy}
                      >
                        <Clipboard size={24} />
                      </button>
                    </div>
                  </div>
                )}
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
                  onClick={handleShortenUrl}
                >
                  Get your link
                  <span className="ml-2">→</span>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="qrcode">
            <div className="bg-white rounded-3xl p-8">
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

                <div>
                  <h3 className="text-lg font-semibold text-[#001233] mb-2">
                    Select QR Code Color
                  </h3>
                  <RadioGroup
                    defaultValue="black"
                    className="flex flex-wrap gap-4"
                    onValueChange={(value) => {
                      const selectedColor = colors.find(
                        (color) => color.id === value
                      );
                      if (selectedColor) {
                        setQrColor(selectedColor.value);
                      }
                    }}
                  >
                    {colors.map((color) => (
                      <div key={color.id}>
                        <RadioGroupItem
                          value={color.id}
                          id={color.id}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={color.id}
                          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-4 border-white peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary peer-data-[state=checked]:ring-offset-2 hover:opacity-90"
                          style={{ backgroundColor: color.value }}
                        />
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <Button
                  size="lg"
                  className="w-full md:w-auto bg-[#a24b33] hover:bg-[#a06b5d] text-lg px-8 py-6 rounded-xl"
                  onClick={handleGenerateQR}
                >
                  Generate QR Code
                </Button>

                {qrGenerated && qrCodeDataUrl && (
                  <div className="flex justify-center mt-6">
                    <img
                      src={qrCodeDataUrl || "/placeholder.svg"}
                      alt="QR Code"
                    />
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
