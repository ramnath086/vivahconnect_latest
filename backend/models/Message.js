import mongoose from 'mongoose';
const messageSchema = new mongoose.Schema({
  room:      String,
  sender:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  body:      String,
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('Message', messageSchema);
