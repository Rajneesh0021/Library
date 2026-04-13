const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  checkIn: { type: Date },
  checkOut: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
