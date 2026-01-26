import express from "express";
import { registerUser,loginUser } from "../controller/Auth.controller.js";

const authrouter = express.Router();

// POST /client/register
authrouter.post("/client/register", registerUser);
authrouter.post("/login", loginUser);

// GET /client/login
//router.get("/client/login", loginUser);

export default authrouter;
