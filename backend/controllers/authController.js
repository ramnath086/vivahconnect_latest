import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// helper ─────────────────────────────────────────────────────────────
const makeToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// @route   POST /api/auth/register
export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // already exists?
  if (await User.findOne({ email }))
    return res.status(400).json({ message: 'Email already registered' });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashed,
  });

  const token = makeToken(user._id);
  res.status(201).json({ token });
};

// @route   POST /api/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = makeToken(user._id);
  res.json({ token });
};
