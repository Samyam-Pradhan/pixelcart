import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/orders", orderRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "order-service is running" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Order service running on port ${PORT}`);
});