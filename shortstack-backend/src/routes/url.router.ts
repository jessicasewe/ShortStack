import { Router } from "express";
import {
  createShortUrl,
  redirectToOriginalUrl,
  getLinks,
  deleteLinkById,
} from "../controllers/url.controller";
import { rateLimiter } from "../middlewares/rate-limiter";
import logger from "../utils/logger";

const urlRouter = Router();

urlRouter.use((req, res, next) => {
  logger.info(`Request method: ${req.method}, Request URL: ${req.url}`);
  next();
});

urlRouter.use(rateLimiter());

urlRouter.get("/links", getLinks);
urlRouter.delete("/links/:id", deleteLinkById as any);
urlRouter.post("/shorten", createShortUrl as any);
urlRouter.get("/:shortUrl", redirectToOriginalUrl as any);

export default urlRouter;
