const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: String,
  phone: String,
  address: String,
  cartItems: [
    {
      title: String,
      price: Number,
      quantity: Number,
      image: String,
    }
  ],
  total: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Orders', orderSchema, 'orders'); 
