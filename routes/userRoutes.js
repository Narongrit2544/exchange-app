const express = require('express');
const router = express.Router();
const { getUsers, createUser } = require('../controllers/userController');

router.get('/', getUsers);
router.post('/', createUser);

router.get('/log/visit', (req, res) => {
    res.json({ message: 'API Log Visit is working!' });
});

module.exports = router;
