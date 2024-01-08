const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../models/user');

// Login route
router.post('/login', async (req, res) => {
  console.log('Received login request with body:', req.body);

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      console.log(`Authentication failed. User: null`);
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    res.status(200).json({ message: 'Login successful.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

 


// Signup route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists.' });
    }

    const newUser = new User({
      username,
      email,
      password, // Note: In a real-world scenario, you should hash the password before storing it.
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

module.exports = router;
