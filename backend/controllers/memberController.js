const Member = require('../models/Member');
const Seat = require('../models/Seat');
const { addMonths } = require('date-fns');

// @desc Add new member
// @route POST /api/members
exports.addMember = async (req, res) => {
  const { name, phone, membershipType, planType, seatNumber } = req.body;
  try {
    const seat = await Seat.findOne({ seatNumber });
    if (!seat || seat.status !== 'available') {
      return res.status(400).json({ message: 'Seat not available' });
    }

    let months = 1;
    if (planType === 'half-yearly') months = 6;
    if (planType === 'yearly') months = 12;

    const expiryDate = addMonths(new Date(), months);

    const member = new Member({
      name,
      phone,
      membershipType,
      planType,
      seatId: seat._id,
      expiryDate,
      feeStatus: 'paid', // Assuming initial payment
      lastPaymentDate: new Date()
    });

    const savedMember = await member.save();
    
    // Update seat status
    seat.assignedMemberId = savedMember._id;
    seat.status = 'occupied';
    await seat.save();

    res.status(201).json(savedMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all members
// @route GET /api/members
exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find().populate('seatId');
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get member by ID
// @route GET /api/members/:id
exports.getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id).populate('seatId');
    if (member) res.json(member);
    else res.status(404).json({ message: 'Member not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
