const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController'); 


router.get('/', walletController.getAllWallets); 
router.post('/transfer', walletController.transfer);
router.post('/add', walletController.addBalance);

module.exports = router;
