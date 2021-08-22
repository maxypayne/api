const mongoose = require('mongoose');

const { Schema } = mongoose;

const formSchema = new Schema({ email: String });

module.exports = mongoose.model('Form', formSchema);
