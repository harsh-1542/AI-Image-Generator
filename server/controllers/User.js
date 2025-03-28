import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import mongoose from "mongoose"; 
import generateToken from "../utils/GenerateJWT.js";

export const RegisterUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      status: "success",
      message: "User Created Successfully",
      token: generateToken(user._id),
    });
  } else {
    console.log(user);
    
    res.status(500).json({ message: "Failed to create user" });
  }
});

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      status: "success",
      message: "Login Successful",
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({status: "failed", message: "Invalid email sdfjnfiueufebwi or password" });
  }
});





// ✅ Controller to get user details by user ID
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id; // Extract user ID from request params

  
    // ✅ Validate if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }else{

      const user = await User.findById(userId).select("username email"); // Exclude password
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }else{

        res.status(200).json(user);
      }
    }


  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server Error" });
  }
};



















// const asyncHandler = require("express-async-handler");
// const bcrypt = require("bcryptjs");
// const User = require("../models/User");
// const generateToken = require("../utils/GenerateJWT");

// // Register a new user
// const RegisterUser = asyncHandler(async (req, res) => {
//   const { username, email, password } = req.body;

//   if (!username || !email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   const userExists = await User.findOne({ email });

//   if (userExists) {
//     return res.status(400).json({ message: "User already exists" });
//   }

//   // Hash password
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);

//   const user = await User.create({
//     username,
//     email,
//     password: hashedPassword,
//   });

//   if (user) {
//     res.status(201).json({
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(500).json({ message: "Failed to create user" });
//   }
// });

// // Authenticate user
// const authUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required" });
//   }

//   const user = await User.findOne({ email });

//   if (user && (await bcrypt.compare(password, user.password))) {
  
//     res.json({
//       message: "Login successful",
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400).json({ message: "Invalid email or password" });
//   }
// });

// module.exports = { RegisterUser, authUser };
