// controllers/currencyController.js
const db = require('../models');

exports.getAllCurrencies = async (req, res) => {
  try {
    const currencies = await db.Currency.findAll();
    res.json(currencies);
  } catch (error) {
    console.error('Error fetching currencies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
