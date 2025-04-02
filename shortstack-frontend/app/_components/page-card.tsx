"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ShareDialog } from "@/app/_components/share-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  Copy,
  Download,
  MoreHorizontal,
  Share2,
  Trash,
  Pencil,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { toast } from "sonner";
import { jsPDF } from "jspdf";

interface PageCardProps {
  id: string;
  url: string;
  title: string;
  type: string;
  date: string;
  selected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  color: string;
  bgColor: string;
}

export default function PageCard({
  id,
  url,
  title,
  type,
  date,
  selected,
  onSelect,
  onDelete,
  color,
  bgColor,
}: PageCardProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success("URL copied to clipboard!");
    });
  };

  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");

  const handleShare = (url: string) => {
    console.log("Share button clicked, URL:", url);
    setSelectedUrl(url);
    setShareDialogOpen(true);
    console.log("shareDialogOpen:", shareDialogOpen);
  };

  const handleDownloadPNG = () => {
    const canvas = document.getElementById(
      `qr-code-${id}`
    ) as HTMLCanvasElement;

    if (!canvas) {
      console.error(
        "Canvas not found! Ensure the ID matches and the element is rendered."
      );
      return;
    }

    try {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${title || "qr-code"}.png`;

      document.body.appendChild(downloadLink);
      downloadLink.click();

      document.body.removeChild(downloadLink);
      console.log("PNG download triggered successfully.");
    } catch (error) {
      console.error("Error generating PNG:", error);
    }
  };

  const handleDownloadPDF = () => {
    const canvas = document.getElementById(
      `qr-code-${id}`
    ) as HTMLCanvasElement;

    if (canvas) {
      try {
        const pdf = new jsPDF();
        const imgData = canvas.toDataURL("image/png");

        const imgWidth = 170;
        const imgHeight = 170;
        const x = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;
        const y = 50;

        pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
        if (title) pdf.text(title, x, y + imgHeight + 10);
        if (url) pdf.text(url, x, y + imgHeight + 20);

        pdf.save(`${title || "qr-code"}.pdf`);
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    } else {
      console.error("Canvas not found!");
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex gap-6">
          <Checkbox
            checked={selected}
            onCheckedChange={onSelect}
            className="mt-1"
          />
          <div className="relative">
            <QRCodeCanvas
              id={`qr-code-${id}`}
              value={url}
              size={128}
              bgColor={bgColor}
              fgColor={color}
              level={"H"}
              includeMargin={true}
            />
            <div className="text-center mt-2 text-sm text-gray-600 italic">
              Scan me
            </div>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-500 mt-1">{type}</p>
                <div className="mt-2">
                  <a
                    href={url}
                    className="text-[#a24b33] text-sm break-all hover:underline"
                  >
                    {url}
                  </a>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="text-black hover:bg-orange-100"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare(`https://${url}`)}
                  className="text-black hover:bg-orange-100"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-orange-100"
                    >
                      <Download className="h-4 w-4 mr-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={handleDownloadPNG}>
                      Download as PNG
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDownloadPDF}>
                      Download as PDF
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 hover:bg-orange-100"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onDelete}>
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex gap-6 mt-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {date}
              </div>
            </div>
          </div>
        </div>

        <ShareDialog
          isOpen={shareDialogOpen}
          onClose={() => setShareDialogOpen(false)}
          url={selectedUrl}
        />
      </CardContent>
    </Card>
  );
}
