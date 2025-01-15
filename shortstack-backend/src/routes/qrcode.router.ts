import { Router } from "express";
import { generateQRCodeHandler } from "../controllers/qrcode.controller";

const router = Router();

router.post("/generate-qr", generateQRCodeHandler as any);

export default router;
