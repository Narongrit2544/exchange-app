const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const orderRoutes = require('./orderRoutes');
const transactionRoutes = require('./transactionRoutes');
const walletRoutes = require('./walletRoutes');
const currencyRoutes = require('./currencyRoutes');
//const paymentRoutes = require('./paymentRoutes');
//const reviewRoutes = require('./reviewRoutes');
//const verificationRoutes = require('./verificationRoutes');

router.use('/users', userRoutes);
router.use('/orders', orderRoutes);
router.use('/transactions', transactionRoutes);
router.use('/wallets', walletRoutes);
router.use('/currencies', currencyRoutes);
//router.use('/payments', paymentRoutes);
//router.use('/reviews', reviewRoutes);
//router.use('/verifications', verificationRoutes);

module.exports = router;
