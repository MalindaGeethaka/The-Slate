import express from "express";
import { protect, admin } from "../middlewares/auth.middleware.js";
import User from "../models/user.model.js";
import Menu from "../models/menu.model.js";
import { deleteUser, getAllUser } from "../controller/Auth.controller.js";

const router = express.Router();

router.get("/dashboard-stats", protect, admin, async (req, res) => {
  try {
   // const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalMenuItems = await Menu.countDocuments();

    
    res.json({
      //totalOrders,
      totalUsers,
      totalMenuItems,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
});

router.delete("/users/:id", protect, admin, deleteUser);
router.get("/users", protect, admin, getAllUser);


export default router;
