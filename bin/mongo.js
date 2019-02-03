let res, rej;
const mongoPromise = new Promise((resolve, reject) => {
  res = resolve;
  rej = reject;
})

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/rasphome', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to mongo');
  res();
});

module.exports = mongoPromise;