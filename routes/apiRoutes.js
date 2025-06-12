const express = require('express');
const router = express.Router();

router.get('/log/visit', (req, res) => {
    res.json({ message: 'API Log Visit is working!' });
});

module.exports = router;
