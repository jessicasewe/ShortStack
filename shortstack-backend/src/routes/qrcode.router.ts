import { Router } from "express";
import {
  createQRCodeHandler,
  getAllQRCodesHandler,
  deleteQRCodeHandler,
} from "../controllers/qrcode.controller";

const qrCodeRouter = Router();

// Protect all routes with authentication

qrCodeRouter.post("/generate-qr", createQRCodeHandler as any);
qrCodeRouter.get("/qr-codes", getAllQRCodesHandler);
qrCodeRouter.delete("/qr-codes/:id", deleteQRCodeHandler);

export default qrCodeRouter;
