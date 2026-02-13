import express from "express";
import { protect, admin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/client/profile", protect, (req, res) => {
  try {
    const user = req.user; 
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to load profile" });
  }
});


router.get("/admin/dashboard", protect, admin, (req, res) => {
  res.status(200).json({
    message: "Admin dashboard accessible",
    user: req.user,
  });
});


export default router;
