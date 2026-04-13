const User = require('../models/User');
const Member = require('../models/Member');
const Seat = require('../models/Seat');

// @desc Get dashboard stats
// @route GET /api/users/stats
exports.getStats = async (req, res) => {
    try {
        const totalStudents = await Member.countDocuments();
        const seats = await Seat.find();
        const occupiedSeats = seats.filter(s => s.status === 'occupied').length;
        const totalSeats = seats.length;
        
        // Dummy revenue calculation for now
        const revenue = totalStudents * 800; 

        res.json({
            totalStudents,
            seatRatio: `${occupiedSeats}/${totalSeats}`,
            revenue: `₹${revenue}`,
            pendingRenewals: 0 // Mock for now
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
