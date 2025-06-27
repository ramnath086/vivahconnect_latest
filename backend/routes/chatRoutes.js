import express from 'express';
import { getRoomMessages } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/:room', protect, getRoomMessages);
export default router;
