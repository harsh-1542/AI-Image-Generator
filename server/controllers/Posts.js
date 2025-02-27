import Post from "../models/Posts.js";
import * as dotenv from "dotenv";

import { createError } from "../error.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

// cloudinary for photos upload 
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:  process.env.CLOUDINARY_API_KEY,  
    api_secret:  process.env.CLOUDINARY_API_SECRET
     // Click 'View API Keys' above to copy your API secret
});

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    next(
      createError(
        error.status,
        error?.response?.data?.error?.message || error?.message
      )
    );
  }
};


export const createPost = async (req, res, next) => {
    try {
        const { prompt, photo } = req.body;
// console.log(userId);



        // const photoUrl = await cloudinary.uploader.upload(photo);
        const newPost = await Post.create({
          createdBy: req.user.uid,prompt,photo: photo
          // createdBy: req.user._id,prompt,photo: photoUrl?.secure_url
        })

        return res.status(200).json({success: true, data: newPost})
    } catch (error) {
        next(
            createError(
              error.status,
              error?.response?.data?.error?.message || error?.message
            )
          );
    }
}