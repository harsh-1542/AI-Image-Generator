import express from 'express';
// import { createPost, getAllPosts } from '../controllers/Posts.js';
import { RegisterUser, authUser } from '../controllers/User.js';

const router = express.Router();

router.post('/login', authUser)
router.post('/register', RegisterUser)

export default router;