const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = new Schema({
  name: String,
  day: String,
  month: String,
  year: String,
  hour: String,
  url: String,
  type: String,
  time: String,
  dayName: String,
});

module.exports = mongoose.model('Image', imageSchema);
