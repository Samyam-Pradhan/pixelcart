import express from "express";
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";
import auth, { isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createOrder);
router.get("/", auth, getUserOrders);
router.get("/:id", auth, getOrderById);
router.put("/:id/status", auth, isAdmin, updateOrderStatus);

export default router;