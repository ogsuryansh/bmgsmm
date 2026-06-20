require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Settings = require('./models/Settings');

const app = express();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Middleware
// Using dynamic frontend URL from env to avoid hardcoding origins
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.post('/api/auth/google', async (req, res) => {
  const { credential } = req.body;
  
  if (!credential) {
    return res.status(400).json({ message: 'Missing credential token' });
  }

  try {
    // We use the UserInfo endpoint since the custom frontend button uses useGoogleLogin which returns an access_token
    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${credential}` }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user profile from Google');
    }
    
    const payload = await response.json();
    const { sub: googleId, email, name, picture } = payload;

    let user = await User.findOne({ email });
    
    if (!user) {
      user = await User.create({ googleId, email, name, picture });
      console.log('New user created:', email);
    } else {
      console.log('Existing user logged in:', email);
    }

    // TODO: Generate a JWT here to send back to the frontend for maintaining session
    // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, user });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
});

// Admin Middleware
const adminAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') throw new Error('Not admin');
    next();
  } catch (err) {
    res.status(403).json({ message: 'Unauthorized' });
  }
};

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '12h' });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Get Users (Admin)
app.get('/api/admin/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get Settings (Admin)
app.get('/api/admin/settings', adminAuth, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({});
    res.json({ success: true, settings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update Settings (Admin)
app.post('/api/admin/settings', adminAuth, async (req, res) => {
  try {
    const { smmApiUrl, smmApiKey } = req.body;
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({ smmApiUrl, smmApiKey });
    } else {
      settings.smmApiUrl = smmApiUrl;
      settings.smmApiKey = smmApiKey;
      await settings.save();
    }
    res.json({ success: true, settings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
