import { Request, Response } from "express";
import bcrypt from "bcryptjs";

const urlMapping = new Map<
  string,
  { originalUrl: string; passwordHash?: string }
>();

const generateShortUrl = (): string => {
  return Math.random().toString(36).substring(2, 8);
};

export const createShortUrl = async (req: Request, res: Response) => {
  try {
    const { originalUrl, password } = req.body;

    const existingUrl = [...urlMapping].find(
      ([_, urlData]) => urlData.originalUrl === originalUrl
    );
    if (existingUrl) {
      return res.status(200).json({
        msg: "This URL is already shortened.",
        shortUrl: `http://localhost:5000/${existingUrl[0]}`,
      });
    }

    const shortUrl = generateShortUrl();

    let passwordHash: string | undefined = undefined;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      passwordHash = await bcrypt.hash(password, salt);
    }

    urlMapping.set(shortUrl, { originalUrl, passwordHash });

    res.status(201).json({
      originalUrl,
      shortUrl: `http://localhost:5000/${shortUrl}`,
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error });
  }
};

// Handle redirection to the original URL
export const redirectToOriginalUrl = async (req: Request, res: Response) => {
  try {
    const shortUrl = req.params.shortUrl;
    const { password } = req.body;

    const urlData = urlMapping.get(shortUrl);

    if (!urlData) {
      return res.status(404).json({ msg: "Short URL not found" });
    }

    if (urlData.passwordHash) {
      if (!password) {
        return res.status(400).json({ msg: "Password required" });
      }

      const isMatch = await bcrypt.compare(password, urlData.passwordHash);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid password" });
      }
    }

    res.redirect(urlData.originalUrl);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error });
  }
};
