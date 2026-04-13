const express = require('express');
const router = express.Router();
const { getSeats, initSeats } = require('../controllers/seatController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
  .get(protect, getSeats);

router.route('/init')
  .post(protect, admin, initSeats);

module.exports = router;
