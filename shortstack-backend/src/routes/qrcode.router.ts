import { Router } from "express";
import {
  createQRCodeHandler,
  getAllQRCodesHandler,
  deleteQRCodeHandler,
} from "../controllers/qrcode.controller";
import { rateLimiter } from "../middlewares/rate-limiter";

const qrCodeRouter = Router();

qrCodeRouter.use(rateLimiter());
qrCodeRouter.post("/generate-qr", createQRCodeHandler as any);
qrCodeRouter.get("/qr-codes", getAllQRCodesHandler);
qrCodeRouter.delete("/qr-codes/:id", deleteQRCodeHandler);

export default qrCodeRouter;
