const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/,
  },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
