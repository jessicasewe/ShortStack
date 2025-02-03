"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Globe,
  Clock,
  Lock,
  BarChart2,
  Pencil,
  X,
  Copy,
  ExternalLink,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateLinkModal({
  isOpen,
  onClose,
}: CreateLinkModalProps) {
  const [destinationUrl, setDestinationUrl] = useState("");
  const [customPath, setCustomPath] = useState("");
  const [selectedColor, setSelectedColor] = useState("#FF3366");

  const colors = [
    "#FF3366",
    "#3366FF",
    "#33CC66",
    "#FF9933",
    "#9933FF",
    "#33CCFF",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>New link</DialogTitle>
            <Badge variant="secondary">Draft saved</Badge>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <div>
              <Label htmlFor="destination">Destination URL</Label>
              <Input
                id="destination"
                placeholder="https://example.com/your-long-url"
                value={destinationUrl}
                onChange={(e) => setDestinationUrl(e.target.value)}
              />
            </div>

            <div>
              <Label>Short Link</Label>
              <div className="flex gap-2">
                <Select defaultValue="default">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select domain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">dub.sh</SelectItem>
                    <SelectItem value="custom">Custom domain</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="custom-path"
                  value={customPath}
                  onChange={(e) => setCustomPath(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label>QR Code Color</Label>
              <div className="flex gap-2 mt-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full ${
                      selectedColor === color
                        ? "ring-2 ring-offset-2 ring-black"
                        : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="tags">Tags</Label>
              <Input id="tags" placeholder="Add tags..." />
            </div>

            <div>
              <Label htmlFor="comments">Comments</Label>
              <Textarea
                id="comments"
                placeholder="Add any notes about this link..."
                className="h-20"
              />
            </div>
          </div>

          {/* Right Column - Preview & Features */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">QR Code</h3>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <div
                className="aspect-square bg-white rounded-lg p-4 flex items-center justify-center"
                style={{ border: `2px solid ${selectedColor}` }}
              >
                {/* Placeholder for QR Code */}
                <div className="w-full h-full bg-gray-100 rounded" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 pt-6 border-t">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              UTM Builder
            </Button>
            <Button variant="outline" size="sm">
              <Clock className="h-4 w-4 mr-1" />
              Schedule
            </Button>
            <Button variant="outline" size="sm">
              <Lock className="h-4 w-4 mr-1" />
              Password
            </Button>
          </div>
          <Button className="bg-black text-white hover:bg-black/90">
            Create link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
