// chat handled via WebSocket; REST kept minimal for history
import Message from '../models/Message.js';

export const getRoomMessages = async (req, res) => {
  const { room } = req.params;
  const msgs = await Message.find({ room }).populate('sender', 'firstName lastName');
  res.json(msgs);
};
