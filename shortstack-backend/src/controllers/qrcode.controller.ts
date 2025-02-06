import { Request, Response } from "express";
import { generateQRCode } from "../services/qrcode.service";
import QRCode from "../models/qr-code.model";
import logger from "../utils/logger";

export const createQRCodeHandler = async (req: Request, res: Response) => {
  const { title, destinationUrl, qrCodeData } = req.body;

  logger.info("QR Code creation request received.");

  // Validation
  if (!title || !destinationUrl) {
    logger.warn("QR Code creation failed: Missing title or destination URL.");
    return res
      .status(400)
      .json({ error: "Title and destination URL are required" });
  }

  try {
    // Parse the qrCodeData to get the color
    const { color } = JSON.parse(qrCodeData);

    // Generate QR Code with the selected color
    logger.info(`Generating QR Code for destination URL: ${destinationUrl}`);
    const qrCodeDataUrl = await generateQRCode(destinationUrl, color);

    // Save to database
    const qrCode = await QRCode.create({
      title,
      destinationUrl,
      qrCodeData: qrCodeDataUrl,
      color, // Store the selected color
    });

    logger.info(`QR Code successfully created with ID: ${qrCode._id}`);
    res.status(201).json(qrCode);
  } catch (error) {
    logger.error(`Error creating QR Code: ${error}`);
    res.status(500).json({ error: "Failed to create QR Code" });
  }
};

export const getAllQRCodesHandler = async (req: Request, res: Response) => {
  try {
    logger.info("Fetching all QR codes from the database.");
    const qrCodes = await QRCode.find({});
    logger.info(`Fetched ${qrCodes.length} QR codes.`);
    res.status(200).json(qrCodes);
  } catch (error) {
    logger.error(`Error fetching QR codes: ${error}`);
    res.status(500).json({ error: "Failed to fetch QR codes" });
  }
};

export const deleteQRCodeHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  logger.info(`QR Code deletion request received for ID: ${id}`);

  try {
    // Check if QR code exists
    const qrCode = await QRCode.findById(id);
    if (!qrCode) {
      logger.warn(`QR Code with ID: ${id} not found.`);
      res.status(404).json({ error: "QR Code not found" });
      return;
    }

    // Delete QR Code
    await qrCode.deleteOne();
    logger.info(`QR Code with ID: ${id} successfully deleted.`);

    res.status(200).json({ message: "QR Code deleted successfully" });
  } catch (error) {
    logger.error(`Error deleting QR Code with ID: ${id} - ${error}`);
    res.status(500).json({ error: "Failed to delete QR Code" });
  }
};
