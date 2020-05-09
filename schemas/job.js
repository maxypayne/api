const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  id: Number,
  company: String,
  logo: String,
  new: Boolean,
  featured: Boolean,
  position: String,
  role: String,
  level: String,
  postedAt: String,
  contract: String,
  location: String,
  languages: Array,
});

module.exports = mongoose.model('Job', jobSchema);
