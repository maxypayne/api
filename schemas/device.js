const mongoose = require('mongoose');

const { Schema } = mongoose;

const deviceSchema = new Schema({
  id: String,
  name: String,
  location: String,
  status: String,
  battery: String,
  date: Date,
});

module.exports = mongoose.model('Device', deviceSchema);
