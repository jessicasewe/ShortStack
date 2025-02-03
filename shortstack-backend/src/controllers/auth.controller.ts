import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import logger from "../utils/logger";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    logger.info(`Login attempt for email: ${email}`);

    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(`Login failed: User with email ${email} not found`);
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Login failed: Invalid password for email ${email}`);
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    logger.info(`Login successful for email: ${email}`);

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    logger.error(`Error during login for email ${req.body.email}: ${error}`);
    res.status(500).json({ msg: "Internal server error", error });
  }
};
