const express = require('express');
const Application = require('../models/Application');
const router = express.Router();

router.post('/', async (req, res) => {
  const newApp = new Application(req.body);
  await newApp.save();
  res.json({ message: 'Application submitted successfully' });
});

module.exports = router; // ✅ MUST EXPORT THE ROUTER
