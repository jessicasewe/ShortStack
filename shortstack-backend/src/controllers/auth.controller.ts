import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import logger from "../utils/logger";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, firstName: user.firstName, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error });
  }
};

export const validateToken = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    res.status(200).json({ msg: "Token is valid" });
  } catch (error) {
    res.status(401).json({ msg: "Token is invalid or expired" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ msg: "Logout successful" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error });
  }
};
