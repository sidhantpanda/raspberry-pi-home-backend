const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccessTokenModelSchema = new Schema({
  email: String,
  token: String
}, { timestamps: true });

// Compile model from schema
const AccessToken = mongoose.model('AccessToken', AccessTokenModelSchema);
module.exports = AccessToken;