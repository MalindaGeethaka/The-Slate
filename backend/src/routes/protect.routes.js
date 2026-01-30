import express from "express";
import { protect, admin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "Profile route accessible",
    user: req.user, // info from JWT
  });
});

// Example: Admin-only route
router.get("/admin/dashboard", protect, admin, (req, res) => {
  res.status(200).json({
    message: "Admin dashboard accessible",
    user: req.user,
  });
});

export default router;
