const Seat = require('../models/Seat');

// @desc Get all seats
// @route GET /api/seats
exports.getSeats = async (req, res) => {
  try {
    const seats = await Seat.find().populate('assignedMemberId');
    res.json(seats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create seats (Admin utility)
// @route POST /api/seats/init
exports.initSeats = async (req, res) => {
  const { count, type } = req.body;
  try {
    const seats = [];
    for (let i = 1; i <= count; i++) {
      seats.push({
        seatNumber: `${type.charAt(0).toUpperCase()}${i}`,
        type,
        status: 'available'
      });
    }
    await Seat.insertMany(seats);
    res.status(201).json({ message: `${count} seats initialized` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
