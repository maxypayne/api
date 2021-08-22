const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  'Message',
  new Schema({
    name: String,
    email: String,
    // message: String,
  })
);
