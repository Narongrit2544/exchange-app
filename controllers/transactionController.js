const db = require('../models');

exports.getAllTransactions = async (req, res) => {
  try {
    const txs = await db.Transaction.findAll({ include: db.Order });
    res.json(txs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const tx = await db.Transaction.create(req.body);
    res.status(201).json(tx);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
