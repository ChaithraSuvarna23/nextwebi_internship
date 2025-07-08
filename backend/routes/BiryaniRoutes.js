const express = require('express');
const router = express.Router();
const Biryani = require('../models/Biryani');

router.get('/', async (req, res) => {
  try {
    const items = await Biryani.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
