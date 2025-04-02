import { Request, Response } from "express";
import Page from "../models/page.model";
import logger from "../utils/logger";

// Create a new page
export const createPageHandler = async (req: Request, res: Response) => {
  const {
    userId,
    username,
    title,
    backgroundColor,
    gradientFrom,
    gradientTo,
    bio,
    socialIcons,
    links,
  } = req.body;

  logger.info("Page creation request received.");

  // Validation
  if (!userId || !username || !title) {
    logger.warn("Page creation failed: Missing userId or title.");
    return res.status(400).json({ error: "userId and title are required" });
  }

  try {
    // Create the page
    const page = await Page.create({
      userId,
      username,
      title,
      backgroundColor,
      gradientFrom,
      gradientTo,
      bio,
      socialIcons,
      links,
    });

    logger.info(`Page successfully created with ID: ${page._id}`);
    res.status(201).json(page);
  } catch (error) {
    logger.error(`Error creating page: ${error}`);
    res.status(500).json({ error: "Failed to create page" });
  }
};

// Fetch all pages for a user
export const getAllPagesHandler = async (req: Request, res: Response) => {
  const { userId } = req.params;

  logger.info(`Fetching all pages for user ID: ${userId}`);

  try {
    const pages = await Page.find({ userId });
    logger.info(`Fetched ${pages.length} pages for user ID: ${userId}`);
    res.status(200).json(pages);
  } catch (error) {
    logger.error(`Error fetching pages: ${error}`);
    res.status(500).json({ error: "Failed to fetch pages" });
  }
};

// Fetch a single page by ID
export const getPageByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  logger.info(`Fetching page with ID: ${id}`);

  try {
    const page = await Page.findById(id);
    if (!page) {
      logger.warn(`Page with ID: ${id} not found.`);
      return res.status(404).json({ error: "Page not found" });
    }

    logger.info(`Page with ID: ${id} successfully fetched.`);
    res.status(200).json(page);
  } catch (error) {
    logger.error(`Error fetching page with ID: ${id} - ${error}`);
    res.status(500).json({ error: "Failed to fetch page" });
  }
};

// Update a page by ID
export const updatePageHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    username,
    title,
    backgroundColor,
    gradientFrom,
    gradientTo,
    bio,
    socialIcons,
    links,
  } = req.body;

  logger.info(`Page update request received for ID: ${id}`);

  try {
    const page = await Page.findByIdAndUpdate(
      id,
      {
        username,
        title,
        backgroundColor,
        gradientFrom,
        gradientTo,
        bio,
        socialIcons,
        links,
      },
      { new: true }
    );

    if (!page) {
      logger.warn(`Page with ID: ${id} not found.`);
      return res.status(404).json({ error: "Page not found" });
    }

    logger.info(`Page with ID: ${id} successfully updated.`);
    res.status(200).json(page);
  } catch (error) {
    logger.error(`Error updating page with ID: ${id} - ${error}`);
    res.status(500).json({ error: "Failed to update page" });
  }
};

// Delete a page by ID
export const deletePageHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  logger.info(`Page deletion request received for ID: ${id}`);

  try {
    const page = await Page.findByIdAndDelete(id);
    if (!page) {
      logger.warn(`Page with ID: ${id} not found.`);
      return res.status(404).json({ error: "Page not found" });
    }

    logger.info(`Page with ID: ${id} successfully deleted.`);
    res.status(200).json({ message: "Page deleted successfully" });
  } catch (error) {
    logger.error(`Error deleting page with ID: ${id} - ${error}`);
    res.status(500).json({ error: "Failed to delete page" });
  }
};
