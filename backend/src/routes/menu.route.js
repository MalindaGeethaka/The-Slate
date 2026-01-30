import express from "express";
import {
  getAllMenu,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../controller/menu.controller.js";

import { protect, admin } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/uploads.middleware.js";

const menurouter = express.Router();
  
menurouter.get("/", getAllMenu);
menurouter.get("/:id", getMenuItem);

menurouter.post("/", protect, admin, upload.single("image"), createMenuItem);
menurouter.put("/:id", protect, admin,upload.single("image"), updateMenuItem);
menurouter.delete("/:id", protect, admin, deleteMenuItem);

export default menurouter;