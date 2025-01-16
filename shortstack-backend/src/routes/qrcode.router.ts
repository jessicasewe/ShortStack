import { Router } from "express";
import { generateQRCodeHandler } from "../controllers/qrcode.controller";
import { rateLimiter } from "../middlewares/rate-limiter";

const router = Router();

router.use(rateLimiter());
router.post("/generate-qr", generateQRCodeHandler as any);

export default router;
