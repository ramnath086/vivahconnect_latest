import mongoose from 'mongoose';
const matchRequestSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  target:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status:    { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('MatchRequest', matchRequestSchema);
