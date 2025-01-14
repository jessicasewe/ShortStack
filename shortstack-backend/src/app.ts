import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello from the app!");
});

export default app;
