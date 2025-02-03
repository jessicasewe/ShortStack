import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Url from "../models/url.model";
import logger from "../utils/logger";

const urlMapping = new Map<
  string,
  { originalUrl: string; passwordHash?: string }
>();

const generateShortUrl = (): string => {
  return Math.random().toString(36).substring(2, 8);
};

export const createShortUrl = async (req: Request, res: Response) => {
  try {
    const { originalUrl, password, title } = req.body;
    logger.info(`Request to create short URL for: ${originalUrl}`);

    // Check if the URL already exists in the database
    const existingUrl = await Url.findOne({ originalUrl });
    if (existingUrl) {
      logger.info(`URL already shortened: ${originalUrl}`);
      return res.status(200).json({
        msg: "This URL is already shortened.",
        shortUrl: existingUrl.shortUrl,
      });
    }

    const shortUrlId = generateShortUrl();
    const shortUrl = `http://localhost:5000/${shortUrlId}`;
    let passwordHash: string | undefined = undefined;

    if (password) {
      logger.info("Password provided. Hashing password...");
      const salt = await bcrypt.genSalt(10);
      passwordHash = await bcrypt.hash(password, salt);
    }

    const newUrl = new Url({
      originalUrl,
      shortUrl,
      password: passwordHash,
      title,
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

export const redirectToOriginalUrl = async (req: Request, res: Response) => {
  try {
    const shortUrlId = req.params.shortUrl; // This is the short URL ID (e.g., y01v99)
    const { password } = req.body;
    logger.info(`Request to redirect from short URL ID: ${shortUrlId}`);

    // Find the URL in the database by its ID instead of the full short URL
    const urlData = await Url.findOne({
      shortUrl: `http://localhost:5000/${shortUrlId}`,
    });

    if (!urlData) {
      logger.warn(`Short URL not found: ${shortUrlId}`);
      return res.status(404).json({ msg: "Short URL not found" });
    }

    // Check for password protection
    if (urlData.password) {
      logger.info("Password-protected URL. Verifying password...");
      if (!password) {
        logger.warn(`Password required for short URL: ${shortUrlId}`);
        return res.status(400).json({ msg: "Password required" });
      }

      const isMatch = await bcrypt.compare(password, urlData.password);
      if (!isMatch) {
        logger.warn(`Invalid password for short URL: ${shortUrlId}`);
        return res.status(400).json({ msg: "Invalid password" });
      }
    }

    logger.info(`Redirecting to original URL: ${urlData.originalUrl}`);
    res.redirect(urlData.originalUrl);
  } catch (error) {
    logger.error(
      `Error redirecting from short URL ${req.params.shortUrl}: ${error}`
    );
    res.status(500).json({ msg: "Internal server error", error });
  }
};

export const getLinks = async (req: Request, res: Response) => {
  try {
    logger.info("Fetching all links from the database.");

    // Fetch all URLs from the database
    const links = await Url.find({});

    // Log the fetched data to verify it's being retrieved correctly
    logger.info(`Fetched ${links.length} links:`, links);

    res.status(200).json({ links });
  } catch (error) {
    logger.error(`Error fetching links: ${error}`);
    res.status(500).json({ msg: "Internal server error", error });
  }
};

export const deleteLinkById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    logger.info(`Request to delete URL with ID: ${id}`);

    const deletedUrl = await Url.findByIdAndDelete(id);

    if (!deletedUrl) {
      logger.warn(`URL not found with ID: ${id}`);
      return res.status(404).json({ msg: "URL not found" });
    }

    logger.info(`URL deleted with ID: ${id}`);
    res.status(200).json({ msg: "URL deleted successfully" });
  } catch (error) {
    logger.error(`Error deleting URL with ID ${req.params.id}: ${error}`);
    res.status(500).json({ msg: "Internal server error", error });
  }
};
