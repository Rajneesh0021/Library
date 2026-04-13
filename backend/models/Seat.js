const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatNumber: { type: String, required: true, unique: true },
  type: { type: String, enum: ['day', 'night', '24hr', 'flexible'], required: true },
  assignedMemberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', default: null },
  status: { type: String, enum: ['available', 'occupied', 'temporary'], default: 'available' },
  isInactive: { type: Boolean, default: false } // Triggered by smart logic
}, { timestamps: true });

module.exports = mongoose.model('Seat', seatSchema);
