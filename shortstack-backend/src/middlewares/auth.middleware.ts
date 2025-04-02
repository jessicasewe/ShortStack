import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import logger from "../utils/logger";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ msg: "No token, authorization denied" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      res.status(401).json({ msg: "User not found, authorization denied" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error("Token is not valid", { error });
    res.status(401).json({ msg: "Token is not valid" });
  }
};
