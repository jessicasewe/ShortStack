import { Router } from "express";
import {
  createShortUrl,
  redirectToOriginalUrl,
  getLinks,
  deleteLinkById,
} from "../controllers/url.controller";
import logger from "../utils/logger";

const urlRouter = Router();

urlRouter.use((req, res, next) => {
  logger.info(`Request method: ${req.method}, Request URL: ${req.url}`);
  next();
});

urlRouter.get("/links", getLinks);
urlRouter.delete("/links/:id", deleteLinkById);
urlRouter.post("/shorten", createShortUrl);
urlRouter.get("/:shortUrl", redirectToOriginalUrl);

export default urlRouter;
