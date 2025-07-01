import express from 'express';
import { sendRequest, respondRequest } from '../controllers/matchController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.post('/', protect, sendRequest);
router.post('/respond', protect, respondRequest);
export default router;
