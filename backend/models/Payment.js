const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  planType: { type: String, enum: ['monthly', 'half-yearly', 'yearly'] },
  expiryDate: { type: Date, required: true },
  status: { type: String, enum: ['success', 'failed'], default: 'success' }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
