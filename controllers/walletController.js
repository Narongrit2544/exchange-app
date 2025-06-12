// controllers/walletController.js
const db = require('../models');

exports.getAllWallets = async (req, res) => {
  try {
    const wallets = await db.Wallet.findAll();
    res.json(wallets);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
