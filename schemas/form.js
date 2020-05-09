const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({
  email: String,
});

module.exports = mongoose.model('Form', formSchema);
