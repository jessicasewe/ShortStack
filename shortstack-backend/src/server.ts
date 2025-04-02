import app from "./app";
import http from "http";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import mongoose from "mongoose";
import logger from "./utils/logger";

dotenv.config();

const port = process.env.PORT;
const server = http.createServer(app);

// Log MongoDB connection events
mongoose.connection.once("open", () => {
  logger.info("MongoDB connection established successfully");
});

mongoose.connection.on("error", (err: any) => {
  logger.error("MongoDB connection error", { error: err });
});

async function startServer() {
  try {
    await connectDB();
    logger.info("Database connected successfully");

    server.listen(port, () => {
      logger.info(`Server running on http://shortstck.me:${port}`);
    });
  } catch (error) {
    logger.error("Error starting server", { error });
    process.exit(1); // Exit with failure
  }
}

startServer();
