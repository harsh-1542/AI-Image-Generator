import express from 'express';
import { generateImages } from '../controllers/GenerateAiImage.js';

const router = express.Router();

router.post('/', generateImages)

export default router;