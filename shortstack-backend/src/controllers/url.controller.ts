import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Url from "../models/url.model"; // Assuming you have a Url model
import logger from "../utils/logger";

// Utility function to generate a short URL
const generateShortUrl = (): string => {
  return Math.random().toString(36).substring(2, 8);
};

/**
 * Create a short URL.
 */
export const createShortUrl = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { originalUrl, password, title } = req.body;
    const userId = (req as any).user?._id;

    // if (!userId) {
    //   res.status(401).json({ msg: "User not authenticated" });
    //   return;
    // }

    logger.info(`Request to create short URL for: ${originalUrl}`);

    // Check if the URL has already been shortened by the user
    const existingUrl = await Url.findOne({ originalUrl, userId });
    if (existingUrl) {
      logger.info(`URL already shortened: ${originalUrl}`);
      res.status(200).json({
        msg: "This URL is already shortened.",
        shortUrl: existingUrl.shortUrl,
      });
      return;
    }

    // Generate a short URL ID
    const shortUrlId = generateShortUrl();
    const shortUrl = `http://localhost:5000/${shortUrlId}`;

    // Hash the password if provided
    let passwordHash: string | undefined = undefined;
    if (password) {
      logger.info("Password provided. Hashing password...");
      const salt = await bcrypt.genSalt(10);
      passwordHash = await bcrypt.hash(password, salt);
    }

    // Create and save the new URL
    const newUrl = new Url({
      originalUrl,
      shortUrl,
      password: passwordHash,
      title,
      userId,
    });
    await newUrl.save();

    logger.info(`Short URL created: ${shortUrl} for ${originalUrl}`);
    res.status(201).json({
      originalUrl,
      shortUrl,
    });
  } catch (error) {
    logger.error(
      `Error creating short URL for ${req.body.originalUrl}: ${error}`
    );
    res.status(500).json({ msg: "Internal server error", error });
  }
};

/**
 * Redirect to the original URL using the short URL.
 */
export const redirectToOriginalUrl = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const shortUrlId = req.params.shortUrl;
    const { password } = req.body;
    logger.info(`Request to redirect from short URL ID: ${shortUrlId}`);

    // Find the URL data in the database
    const urlData = await Url.findOne({
      shortUrl: `http://localhost:5000/${shortUrlId}`,
    });

    if (!urlData) {
      logger.warn(`Short URL not found: ${shortUrlId}`);
      res.status(404).json({ msg: "Short URL not found" });
      return;
    }

    // Check for password protection
    if (urlData.password) {
      logger.info("Password-protected URL. Verifying password...");
      if (!password) {
        logger.warn(`Password required for short URL: ${shortUrlId}`);
        res.status(400).json({ msg: "Password required" });
        return;
      }

      // Compare the provided password with the hashed password
      const isMatch = await bcrypt.compare(password, urlData.password);
      if (!isMatch) {
        logger.warn(`Invalid password for short URL: ${shortUrlId}`);
        res.status(400).json({ msg: "Invalid password" });
        return;
      }
    }

    // Redirect to the original URL
    logger.info(`Redirecting to original URL: ${urlData.originalUrl}`);
    res.redirect(urlData.originalUrl);
  } catch (error) {
    logger.error(
      `Error redirecting from short URL ${req.params.shortUrl}: ${error}`
    );
    res.status(500).json({ msg: "Internal server error", error });
  }
};

/**
 * Get all links for the logged-in user.
 */
export const getLinks = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?._id; // Extract user ID from the request

    if (!userId) {
      res.status(401).json({ msg: "User not authenticated" });
      return;
    }

    // Fetch links for the logged-in user
    const links = await Url.find({ userId });

    res.status(200).json({ links });
  } catch (error) {
    logger.error(`Error fetching links: ${error}`);
    res.status(500).json({ msg: "Internal server error", error });
  }
};

/**
 * Delete a link by ID.
 */
export const deleteLinkById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    logger.info(`Request to delete URL with ID: ${id}`);

    // Find and delete the URL
    const deletedUrl = await Url.findByIdAndDelete(id);

    if (!deletedUrl) {
      logger.warn(`URL not found with ID: ${id}`);
      res.status(404).json({ msg: "URL not found" });
      return;
    }

    logger.info(`URL deleted with ID: ${id}`);
    res.status(200).json({ msg: "URL deleted successfully" });
  } catch (error) {
    logger.error(`Error deleting URL with ID ${req.params.id}: ${error}`);
    res.status(500).json({ msg: "Internal server error", error });
  }
};
