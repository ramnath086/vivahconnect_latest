import User from '../models/User.js';
import MatchRequest from '../models/MatchRequest.js';

export const dashboardStats = async (_req, res) => {
  const users = await User.countDocuments();
  const matches = await MatchRequest.countDocuments({ status: 'accepted' });
  res.json({ users, matches });
};
