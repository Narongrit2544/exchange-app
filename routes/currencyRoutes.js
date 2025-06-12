const express = require('express');
const router = express.Router();
const db = require('../models');

// GET /api/currencies - ดึงข้อมูลเหรียญทั้งหมด
router.get('/', async (req, res) => {
  try {
    const currencies = await db.Currency.findAll();
    res.json(currencies);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

module.exports = router;
