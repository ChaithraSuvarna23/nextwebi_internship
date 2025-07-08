const mongoose = require('mongoose');

const biryaniSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  badge: String,
  price: Number,
  type: String,
  rating: Number,
  tag: [String],
  cuisine: [String]
});

module.exports = mongoose.model('Biryani', biryaniSchema, 'biryani'); 
