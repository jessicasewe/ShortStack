import { Request, Response } from "express";
import { generateQRCode } from "../services/qrcode.service";
import logger from "../utils/logger";

export const generateQRCodeHandler = async (req: Request, res: Response) => {
  const { url } = req.body;

  logger.info("QR Code generation request received.");

  if (!url) {
    logger.warn("QR Code generation failed: No URL provided in the request.");
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    logger.info(`Generating QR Code for URL: ${url}`);
    const qrCodeDataUrl = await generateQRCode(url);
    logger.info(`QR Code successfully generated for URL: ${url}`);
    res.json({ qrCode: qrCodeDataUrl });
  } catch (error) {
    logger.error(`Error generating QR Code for URL ${url}: ${error}`);
    res.status(500).json({ error: "Failed to generate QR Code" });
  }
};
