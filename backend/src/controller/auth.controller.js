import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import Order from "../models/order.model.js";

export const registerUser = async (req, res) => {
  const { name, email, password, dob, gender } = req.body;

  if (!name || !email || !password || !dob || !gender) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      dob,
      gender,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req,res) => {
  const {email,password} = req.body;
   
  if(!email || !password){
    return res.status(400).json({message:"Email and password are required"});
  } else{
    try { 
      const user = await User.findOne({email});
      if(!user){
        return res.status(400).json({message:"Invalid email or password"});
      }else{
        const valid = await bcrypt.compare(password,user.password);
        if(!valid){
          return res.status(400).json({message:"Invalid email or password"});
        }else{
          const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  }}}
    catch (error) {

    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }else {
      await User.findByIdAndDelete(req.user.id);
      return res.status(200).json({ message: "User deleted successfully" });
    }}
    catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error while deleting user" });
  }}

  export const getAllUser = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users", error: error.message });
    }
  };

   export const getAllOrders = async (req, res) => {
    try {
      const users = await Order.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders", error: error.message });
    }
  };