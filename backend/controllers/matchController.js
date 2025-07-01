import MatchRequest from '../models/MatchRequest.js';

export const sendRequest = async (req, res) => {
  const { targetId } = req.body;
  const exists = await MatchRequest.findOne({ requester: req.user._id, target: targetId });
  if (exists) return res.status(400).json({ message: 'Already requested' });
  const mr = await MatchRequest.create({ requester: req.user._id, target: targetId });
  res.status(201).json(mr);
};

export const respondRequest = async (req, res) => {
  const { requestId, status } = req.body; // accepted / rejected
  const mr = await MatchRequest.findByIdAndUpdate(requestId, { status }, { new: true });
  res.json(mr);
};
