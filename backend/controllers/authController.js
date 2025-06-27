import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    if (await User.findOne({ email })) return res.status(400).json({ message: 'User exists' });
    const user = await User.create({ firstName, lastName, email, password });
    res.status(201).json({ token: generateToken(user._id) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: 'Invalid credentials' });
    res.json({ token: generateToken(user._id) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
