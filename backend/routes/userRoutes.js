const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/userController');
const { getStats } = require('../controllers/statsController');
const { protect, admin } = require('../middleware/auth');

router.post('/', registerUser);
router.post('/login', authUser);
router.get('/stats', protect, admin, getStats);

module.exports = router;
