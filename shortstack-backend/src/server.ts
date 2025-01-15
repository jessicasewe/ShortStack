import app from "./app";
import http from "http";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const port = process.env.PORT;
const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready");
});

mongoose.connection.on("error", (err: any) => {
  console.log("MongoDB connection error", err);
});

async function startServer() {
  connectDB();

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer();
