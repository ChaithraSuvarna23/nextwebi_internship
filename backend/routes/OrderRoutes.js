const express = require('express');
const router = express.Router();
const Order = require('../models/Order');


router.post('/', async (req, res) => {
  try {
    const {  name, phone, address, cartItems, total } = req.body;

    if ( !name || !phone || !address || !cartItems || !total) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const userInfo = req.cookies.userInfo;

  if (!userInfo) {
    return res.status(400).json({ error: 'User info not found in cookies' });
  }

  let userId;
  try {
    userId = JSON.parse(userInfo).id;
  } catch (err) {
    return res.status(400).json({ error: 'Invalid user info cookie' });
  }

    const order = new Order({
      userId,
      name,
      phone,
      address,
      cartItems,
      total
    });

    await order.save();
    res.status(201).json({ message: 'Order saved successfully' });
    console.log('Order saved:', order);
  } catch (error) {
    console.error('Order submission error:', error);
    res.status(500).json({ message: 'Server error while saving order' });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ timestamp: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Failed to fetch orders:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

