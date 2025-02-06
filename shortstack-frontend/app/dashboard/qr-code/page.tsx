"use client";

import { useState, useEffect } from "react";
import { Search, Calendar, Filter, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import QRCodeCard from "@/app/_components/qr-code-card";
import { toast } from "sonner";
import { CreateQRDialog } from "@/app/_components/create-qr-dialog";

interface QRCodeItem {
  color: string;
  _id: string;
  title: string;
  destinationUrl: string;
  qrCodeData: string;
  createdAt: string;
  updatedAt: string;
}

export default function QRCodesPage() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [qrCodes, setQRCodes] = useState<QRCodeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQRCodes = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/qrcodes/qr-codes"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch QR codes");
        }
        const data = await response.json();
        setQRCodes(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching QR codes:", error);
        toast.error("Failed to fetch QR codes");
      }
    };

    fetchQRCodes();
  }, []);

  const handleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/qrcodes/qr-codes/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete QR code");
      }

      setQRCodes((prev) => prev.filter((code) => code._id !== id));
      toast.success("QR Code deleted successfully");
    } catch (error) {
      console.error("Error deleting QR code:", error);
      toast.error("Failed to delete QR code");
    }
  };

  function generateQRCode() {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">QR Codes</h1>
        <CreateQRDialog
          onCreate={function (): void {
            console.log("QR code creation triggered.");
            generateQRCode();
          }}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Search QR codes..." className="pl-10 w-full" />
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Filter by created date
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Add filters
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={selectedItems.length > 0}
              onCheckedChange={() => {}}
            />
            <span>{selectedItems.length} selected</span>
          </div>
        </div>
        <Select defaultValue="active">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Show" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Show: Active</SelectItem>
            <SelectItem value="archived">Show: Archived</SelectItem>
            <SelectItem value="all">Show: All</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg border p-4">
              <div className="flex items-start gap-4">
                <Skeleton className="h-4 w-4 mt-1" />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Skeleton className="w-32 h-32" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[300px]" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="h-8 w-8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : qrCodes.length > 0 ? (
          qrCodes.map((qrCode) => (
            <QRCodeCard
              key={qrCode._id}
              id={qrCode._id}
              title={qrCode.title}
              type="QR code"
              url={qrCode.destinationUrl}
              date={new Date(qrCode.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
              selected={selectedItems.includes(qrCode._id)}
              onSelect={() => handleSelectItem(qrCode._id)}
              onDelete={() => handleDelete(qrCode._id)}
              color={qrCode.color}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            No QR codes found. Create a new QR code to get started!
          </div>
        )}
      </div>

      <div className="text-center text-gray-500 py-8 border-t border-dashed mt-8">
        You've reached the end of your QR codes
      </div>

      <Alert className="mt-4 bg-cyan-50 border-cyan-200">
        <Sparkles className="h-4 w-4 text-cyan-500" />
        <AlertDescription className="text-cyan-600">
          Change a QR code's destination, even after you've shared it. Get
          redirects with every plan.{" "}
          <a href="#" className="text-cyan-600 underline underline-offset-2">
            View plans
          </a>
        </AlertDescription>
      </Alert>
    </div>
  );
}
