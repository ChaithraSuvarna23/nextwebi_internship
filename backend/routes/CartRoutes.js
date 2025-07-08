// routes/CartRoutes.js
const express = require('express');
const router = express.Router();

const carts = {};


router.get('/', (req, res) => {    
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

  res.json(carts[userId] || []);
});


router.post('/save', (req, res) => {
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
  
  const items = req.body;
  if (!Array.isArray(items)) return res.status(400).json({ error: 'Cart data must be an array' });

  carts[userId] = items;
  res.status(200).json({ message: 'Cart saved' });
});

module.exports = router;
