const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://maxypayne:0JniNG5Ex9JsikiR@cluster0.b1ljpij.mongodb.net/movies'
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Mongoose connected'))
  .catch(err => console.log(err));
