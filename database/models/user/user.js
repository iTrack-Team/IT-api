const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true, index: true },
  surname: { type: String, required: true, index: true },
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
