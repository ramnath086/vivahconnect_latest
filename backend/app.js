import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'https://vivahconnect-latest.vercel.app',
    credentials: true,
  },
});

// ✅ Proper CORS
app.use(cors({
  origin: 'https://vivahconnect-latest.vercel.app',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// ✅ API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

// ✅ WebSocket
io.on('connection', socket => {
  console.log('⚡  WebSocket connected', socket.id);
  socket.on('joinRoom', room => socket.join(room));
  socket.on('chatMessage', ({ room, message }) => {
    io.to(room).emit('message', message);
  });
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => console.log(`🚀  Backend running on ${PORT}`));
  })
  .catch(err => console.error('❌  DB connection error:', err));
