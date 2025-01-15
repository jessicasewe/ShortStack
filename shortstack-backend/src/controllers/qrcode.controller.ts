import { Request, Response } from "express";
import { generateQRCode } from "../services/qrcode.service";

export const generateQRCodeHandler = async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const qrCodeDataUrl = await generateQRCode(url);
    res.json({ qrCode: qrCodeDataUrl });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate QR Code" });
  }
};
