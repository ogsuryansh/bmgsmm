require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { OAuth2Client } = require('google-auth-library');
const User = require('./models/User');

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
