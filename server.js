const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 3000;

// Serve static files from the 'final' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use authentication routes
app.use('/auth', authRoutes);

// Connect to MongoDB with proper options
mongoose.connect('mongodb://localhost:27017/final', {

});

// Check MongoDB connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Catch-all route to serve 'index.html'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
