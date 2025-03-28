import express from 'express';
// import { createPost, getAllPosts } from '../controllers/Posts.js';
import { RegisterUser, authUser, getUserById } from '../controllers/User.js';

const router = express.Router();

router.post('/login', authUser);
router.post('/register', RegisterUser);

// ✅ Route to get user details by ID
// router.get("/:id", getUserById);

export default router;