import express from "express";
import { registerUser,loginUser } from "../controller/Auth.controller.js";

const authrouter = express.Router();

authrouter.post("/client/register", registerUser);
authrouter.post("/login", loginUser);



export default authrouter;
