const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const orderRoutes = require('./orderRoutes');
const transactionRoutes = require('./transactionRoutes');

router.use('/users', userRoutes);
router.use('/orders', orderRoutes);
router.use('/transactions', transactionRoutes);

module.exports = router;
