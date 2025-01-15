import { Router } from "express";
import {
  createShortUrl,
  redirectToOriginalUrl,
} from "../controllers/url.controller";

const urlRouter = Router();

urlRouter.post("/shorten", createShortUrl as any);
urlRouter.get("/:shortUrl", redirectToOriginalUrl as any);

export default urlRouter;
