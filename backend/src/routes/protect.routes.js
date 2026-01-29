import express from "express";
import checkAuth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/client/profile", checkAuth, (req, res) => {
  res.json({
    message: "Protected route success",
    user: req.user,
  });
});

export default router;
