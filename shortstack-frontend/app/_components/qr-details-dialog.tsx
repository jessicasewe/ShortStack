import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QRCodeCanvas } from "qrcode.react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download } from "lucide-react";
import { jsPDF } from "jspdf";
import { motion } from "framer-motion";

interface QRDetailsDialogProps {
  url: string;
  title: string;
  type: string;
  date: string;
  color: string;
  id: string;
}

export function QRDetailsDialog({
  url,
  title,
  type,
  date,
  color,
  id,
}: QRDetailsDialogProps) {
  const handleDownloadPNG = () => {
    const canvas = document.getElementById(
      `qr-code-dialog-${id}`
    ) as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${title || "qr-code"}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const handleDownloadPDF = () => {
    const canvas = document.getElementById(
      `qr-code-dialog-${id}`
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
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 hover:underline text-sm text-gray-500 transition-colors duration-200 hover:text-[#a24b33]">
          View Details
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#a24b33] to-[#d97d64] bg-clip-text text-transparent">
            QR Code Details
          </DialogTitle>
        </DialogHeader>
        <motion.div
          className="flex flex-col items-center gap-6 py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative w-64 h-64 rounded-lg overflow-hidden shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-orange-50 to-white" />
            <div className="absolute inset-0 animate-pulse-subtle opacity-50 bg-gradient-to-tr from-[#a24b33]/10 to-transparent" />
            <div className="relative p-4 h-full flex items-center justify-center">
              <QRCodeCanvas
                id={`qr-code-dialog-${id}`}
                value={url}
                size={224}
                level="H"
                fgColor={color}
                bgColor="#FFFFFF"
              />
            </div>
          </motion.div>
          <motion.div
            className="space-y-3 w-full text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-semibold text-lg bg-gradient-to-r from-[#a24b33] to-[#d97d64] bg-clip-text text-transparent">
              {title}
            </h3>
            <p className="text-sm text-gray-500">{type}</p>
            <p className="text-sm text-gray-500">{date}</p>
            <a
              href={url}
              className="text-[#a24b33] text-sm break-all hover:underline inline-block transition-colors duration-200 hover:text-[#d97d64]"
            >
              {url}
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-gradient-to-r from-[#a24b33] to-[#d97d64] text-white hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={handleDownloadPNG}
                  className="cursor-pointer transition-colors duration-200 hover:bg-orange-50"
                >
                  Download as PNG
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDownloadPDF}
                  className="cursor-pointer transition-colors duration-200 hover:bg-orange-50"
                >
                  Download as PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
