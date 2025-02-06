import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.router";
import authRouter from "./routes/auth.router";
import urlRouter from "./routes/url.router";
import qrCodeRouter from "./routes/qrcode.router";

const app = express();

app.use(express.json());
app.use(cors());

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello from the app!");
});

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRouter);
app.use("/", urlRouter);
app.use("/api/qrcodes", qrCodeRouter);

export default app;
