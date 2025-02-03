import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import logger from "../utils/logger"; // Import the custom logger

// Create user {signup}
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    logger.info("Received signup request", { name, email });

    if (!name || !email || !password || !confirmPassword) {
      logger.warn("Signup failed: Missing required fields");
      return res.status(400).json({ msg: "All fields are required" });
    }

    if (password !== confirmPassword) {
      logger.warn("Signup failed: Passwords do not match", { email });
      return res
        .status(400)
        .json({ msg: "Password and Confirm Password do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn("Signup failed: User already exists", { email });
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    logger.info("User created successfully", { email });

    res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    logger.error("Error creating user", { error });
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    logger.info("Fetching all users");
    const users = await User.find().select("-password");
    logger.info("Users retrieved successfully", { count: users.length });

    res.status(200).json({ message: "Users retrieved successfully", users });
  } catch (error) {
    logger.error("Error fetching users", { error });
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    logger.info("Fetching user by ID", { id });

    const user = await User.findById(id).select("-password");
    if (!user) {
      logger.warn("User not found", { id });
      return res.status(404).json({ message: "User not found" });
    }

    logger.info("User retrieved successfully", { id });
    res.status(200).json({ message: "User retrieved successfully", user });
  } catch (error) {
    logger.error("Error fetching user by ID", { error });
    res.status(500).json({ message: "Internal server error", error });
  }
};
