"use client";

import { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { QRCodeCanvas } from "qrcode.react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QRCodeStyle {
  color: string;
  frame?: string;
}

export function CreateQRDialog({ onCreate }: { onCreate: () => void }) {
  const [step, setStep] = useState(1);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [qrStyle, setQrStyle] = useState<QRCodeStyle>({
    color: "#000000",
    frame: "none",
  });
  const [isOpen, setIsOpen] = useState(false);

  const colorPresets = [
    "#000000",
    "#E53E3E",
    "#ED8936",
    "#38A169",
    "#4299E1",
    "#4C51BF",
    "#9F7AEA",
    "#ED64A6",
  ];

  const frames = [
    {
      id: "none",
      preview: (
        <div className="w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-6 h-6">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      ),
    },
    {
      id: "simple",
      preview: (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-current rounded-sm" />
        </div>
      ),
    },
    {
      id: "scan-me-basic",
      preview: (
        <div className="w-full h-full flex flex-col items-center justify-center gap-1">
          <div className="w-6 h-6 border-2 border-current rounded-sm" />
          <div className="text-[8px] font-medium">SCAN ME</div>
        </div>
      ),
    },
    {
      id: "scan-me-dark",
      preview: (
        <div className="w-full h-full flex flex-col items-center justify-center gap-1">
          <div className="w-6 h-6 border-2 border-current rounded-sm" />
          <div className="text-[8px] font-medium bg-black text-white px-1">
            SCAN ME
          </div>
        </div>
      ),
    },
    {
      id: "scan-me-cursive",
      preview: (
        <div className="w-full h-full flex items-center justify-center relative">
          <div className="w-6 h-6 border-2 border-current rounded-sm" />
          <div className="absolute -right-1 bottom-0 transform rotate-[-15deg]">
            <div className="text-[8px] font-medium italic">Scan me</div>
            <svg viewBox="0 0 24 24" className="w-3 h-3 transform rotate-90">
              <path
                d="M12 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
        </div>
      ),
    },
    {
      id: "scan-me-box",
      preview: (
        <div className="w-full h-full flex flex-col items-center justify-center gap-1 relative">
          <div className="w-6 h-6 border-2 border-current rounded-sm" />
          <div className="absolute -top-2 right-0">
            <div className="text-[8px] font-medium border border-current px-1 rounded-sm bg-white">
              SCAN ME
            </div>
          </div>
        </div>
      ),
    },
  ];

  const getFrameComponent = (qrCode: JSX.Element) => {
    const frame = frames.find((f) => f.id === qrStyle.frame);
    if (!frame || frame.id === "none") return qrCode;

    switch (frame.id) {
      case "simple":
        return (
          <div className="p-4 border-2 border-black rounded-lg">{qrCode}</div>
        );
      case "scan-me-basic":
        return (
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 border-2 border-black rounded-lg">{qrCode}</div>
            <div className="text-sm font-medium">SCAN ME</div>
          </div>
        );
      case "scan-me-dark":
        return (
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 border-2 border-black rounded-lg">{qrCode}</div>
            <div className="text-sm font-medium bg-black text-white px-2 py-0.5">
              SCAN ME
            </div>
          </div>
        );
      case "scan-me-cursive":
        return (
          <div className="relative">
            <div className="p-4 border-2 border-black rounded-lg">{qrCode}</div>
            <div className="absolute -right-2 bottom-0 transform rotate-[-15deg]">
              <div className="text-sm font-medium italic">Scan me</div>
              <svg viewBox="0 0 24 24" className="w-4 h-4 transform rotate-90">
                <path
                  d="M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        );
      case "scan-me-box":
        return (
          <div className="relative">
            <div className="p-4 border-2 border-black rounded-lg">{qrCode}</div>
            <div className="absolute -top-3 right-4">
              <div className="text-sm font-medium border border-current px-2 py-0.5 rounded bg-white">
                SCAN ME
              </div>
            </div>
          </div>
        );
      default:
        return qrCode;
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/qrcodes/generate-qr",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            destinationUrl: url,
            qrCodeData: JSON.stringify(qrStyle), // Send the selected color
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.msg || "Failed to create QR code.");
        return;
      }

      const responseData = await response.json();
      setQrCodeUrl(responseData.qrCodeUrl);
      toast.success("QR code created successfully!");

      // Close the modal
      setIsOpen(false);

      // Reload the page to reflect the new QR code
      window.location.reload();
    } catch (error) {
      console.error("Error creating QR code:", error);
      toast.error("Failed to create QR code.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-[#a24b33] hover:bg-[#ebd4cd] hover:text-black"
        >
          Create QR code
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        {step === 1 ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Create a QR Code</DialogTitle>
              <DialogDescription>
                Enter details to generate your QR code.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Destination</Label>
                <Input
                  placeholder="https://example.com/my-long-url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>
                  Title <span className="text-gray-500">(optional)</span>
                </Label>
                <Input
                  placeholder="Enter a title to help you remember this QR code"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button
                className="bg-[#a24b33] hover:bg-[#ebd4cd] hover:text-black"
                onClick={() => setStep(2)}
              >
                Continue to customize
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex justify-between items-start">
                <div>
                  <DialogTitle className="text-2xl">Select a style</DialogTitle>
                  <DialogDescription>
                    Customize the appearance of your QR code
                  </DialogDescription>
                </div>
                <div className="text-right">
                  <Button variant="ghost" className="text-gray-500">
                    Preview
                  </Button>
                </div>
              </div>
            </DialogHeader>
            <div className="grid grid-cols-[1fr,300px] gap-6">
              <div className="space-y-8">
                <div>
                  <Label className="text-base font-semibold">
                    Choose your color
                  </Label>
                  <div className="mt-4">
                    <Label className="text-sm">Preset</Label>
                    <div className="grid grid-cols-8 gap-2 mt-2">
                      {colorPresets.map((color) => (
                        <Button
                          key={color}
                          variant="outline"
                          className={cn(
                            "h-8 w-8 p-0.5",
                            qrStyle.color === color && "border-[#a24b33]"
                          )}
                          onClick={() => setQrStyle({ ...qrStyle, color })}
                        >
                          <div
                            className="w-full h-full rounded-sm"
                            style={{ backgroundColor: color }}
                          />
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-4 mt-4">
                    <div>
                      <Label className="text-sm">Custom color</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          type="color"
                          value={qrStyle.color}
                          onChange={(e) =>
                            setQrStyle({ ...qrStyle, color: e.target.value })
                          }
                          className="w-[100px] p-1"
                        />
                        <Input
                          value={qrStyle.color.toUpperCase()}
                          onChange={(e) =>
                            setQrStyle({ ...qrStyle, color: e.target.value })
                          }
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold">
                    Select a frame
                  </Label>
                  <div className="grid grid-cols-6 gap-2 mt-2">
                    {frames.map((frame) => (
                      <Button
                        key={frame.id}
                        variant="outline"
                        className={cn(
                          "h-16 relative",
                          qrStyle.frame === frame.id &&
                            "border-[#a24b33] border-2"
                        )}
                        onClick={() =>
                          setQrStyle({ ...qrStyle, frame: frame.id })
                        }
                      >
                        {frame.preview}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="aspect-square w-full relative flex items-center justify-center">
                  {getFrameComponent(
                    <QRCodeCanvas
                      value={url || "https://example.com"}
                      size={200}
                      level="H"
                      fgColor={qrStyle.color}
                      bgColor="#FFFFFF"
                      className="w-full h-full max-w-[200px] max-h-[200px]"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                className="bg-[#a24b33] hover:bg-[#ebd4cd] hover:text-black"
                onClick={handleCreate}
              >
                Create QR Code
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
