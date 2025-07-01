import User from '../models/User.js';

export const getMe = (req, res) => res.json(req.user);

export const updateMe = async (req, res) => {
  const updates = req.body;
  const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
  res.json(user);
};
