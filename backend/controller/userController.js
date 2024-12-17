const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Profile = require('../models/profileModel');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const generateToken = (userId) => jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ success: false, message: 'All fields are required.' });

  try {
    const user = await User.create({ name, email, password });
    await Profile.create({ userId: user.id });
    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      user: { id: user.id, name, email },
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error registering user.' });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password are required.' });

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials.' });

    const token = generateToken(user.id);

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error logging in.' });
  }
};

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ where: { userId: req.user.id }, include: User });
    if (!profile) return res.status(404).json({ success: false, message: 'Profile not found.' });

    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving profile.' });
  }
};

const updateProfile = async (req, res) => {
  const { bio, location } = req.body;

  try {
    const profile = await Profile.findOne({ where: { userId: req.user.id } });
    if (!profile) return res.status(404).json({ success: false, message: 'Profile not found.' });

    profile.bio = bio || profile.bio;
    profile.location = location || profile.location;
    await profile.save();

    res.status(200).json({ success: true, message: 'Profile updated successfully.', profile });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating profile.' });
  }
};

module.exports = { signUp, signIn, getProfile, updateProfile };
