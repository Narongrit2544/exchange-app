const db = require('../models');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await db.Order.findAll({
      include: [
        { model: db.User, as: 'Buyer', attributes: ['name'] },
        { model: db.User, as: 'Seller', attributes: ['name'] },
        { model: db.Currency }
      ]
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
