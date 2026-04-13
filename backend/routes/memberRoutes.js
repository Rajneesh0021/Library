const express = require('express');
const router = express.Router();
const { addMember, getMembers, getMemberById } = require('../controllers/memberController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
  .post(protect, admin, addMember)
  .get(protect, admin, getMembers);

router.route('/:id')
  .get(protect, getMemberById);

module.exports = router;
