const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
  email: String,
  name: String,
  picture: String
}, { timestamps: true });

// Compile model from schema
const User = mongoose.model('User', UserModelSchema);
module.exports = User;