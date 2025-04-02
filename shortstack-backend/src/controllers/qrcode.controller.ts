import { Request, Response } from "express";
import { generateQRCode } from "../services/qrcode.service";
import QRCode from "../models/qr-code.model";
import logger from "../utils/logger";

export const createQRCodeHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, destinationUrl, qrCodeData } = req.body;

  logger.info("QR Code creation request received.");

  // Validation
  if (!title || !destinationUrl) {
    logger.warn("QR Code creation failed: Missing title or destination URL.");
    res.status(400).json({ error: "Title and destination URL are required" });
    return;
  }

  try {
    const { color, backgroundColor } = JSON.parse(qrCodeData);

    // Generate QR Code with the selected color and background color
    logger.info(`Generating QR Code for destination URL: ${destinationUrl}`);
    const qrCodeDataUrl = await generateQRCode(
      destinationUrl,
      color,
      backgroundColor
    );

    // Save to database with the authenticated user's ID
    const qrCode = await QRCode.create({
      title,
      destinationUrl,
      qrCodeData: qrCodeDataUrl,
      color,
      backgroundColor,
      userId: (req as any).user._id,
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
    logger.info("Fetching all QR codes for the authenticated user.");
    const qrCodes = await QRCode.find({ userId: (req as any).user._id });
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
    // Check if QR code exists and belongs to the authenticated user
    const qrCode = await QRCode.findOne({
      _id: id,
      userId: (req as any).user._id,
    }); // Cast req to any to access user property
    if (!qrCode) {
      logger.warn(`QR Code with ID: ${id} not found or unauthorized.`);
      res.status(404).json({ error: "QR Code not found or unauthorized" });
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
