import express from "express";
import { login, validateToken, logout } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/login", login as any);
authRouter.get("/validate-token", validateToken as any);
authRouter.post("/logout", logout as any);

export default authRouter;
