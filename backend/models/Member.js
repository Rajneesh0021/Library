const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  membershipType: { type: String, enum: ['day', 'night', '24hr'], required: true },
  planType: { type: String, enum: ['monthly', 'half-yearly', 'yearly'], required: true },
  seatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seat' },
  feeStatus: { type: String, enum: ['paid', 'pending', 'overdue'], default: 'pending' },
  lastPaymentDate: { type: Date },
  expiryDate: { type: Date },
  isActive: { type: Boolean, default: true },
  consecutiveAbsenceDays: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);
