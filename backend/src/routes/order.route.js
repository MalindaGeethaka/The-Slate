import express from "express";
import Order from "../models/order.model.js";
import { protect, admin } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post("/", protect, async (req, res) => {
  try {
    const order = new Order({
      user: req.user.id,
      items: req.body.items,
      totalPrice: req.body.totalPrice,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Order creation failed" });
  }
});


router.get("/", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

export default router;
