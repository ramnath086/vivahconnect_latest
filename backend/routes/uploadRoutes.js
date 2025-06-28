import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { protect } from '../middleware/authMiddleware.js';

// ─── Cloudinary config (already loaded via dotenv in app.js) ──────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router  = express.Router();
const upload  = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5_000_000 } }); // 5 MB

// POST /api/upload  (protected)
router.post('/', protect, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file' });

    const file64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    const { secure_url } = await cloudinary.uploader.upload(file64, {
      folder: 'vivah_profiles',
      transformation: [
        { width: 800, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' },
      ],
    });

    res.json({ url: secure_url });
  } catch (err) {
    console.error('Cloudinary upload error →', err);
    res.status(500).json({ message: 'Upload failed' });
  }
});

export default router;
