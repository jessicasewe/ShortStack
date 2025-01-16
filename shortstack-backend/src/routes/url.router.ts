import { Router } from "express";
import {
  createShortUrl,
  redirectToOriginalUrl,
} from "../controllers/url.controller";
import { rateLimiter } from "../middlewares/rate-limiter";

const urlRouter = Router();

urlRouter.use(rateLimiter());
urlRouter.post("/shorten", createShortUrl as any);
urlRouter.get("/:shortUrl", redirectToOriginalUrl as any);

export default urlRouter;
