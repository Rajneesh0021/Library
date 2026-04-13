const mongoose = require('mongoose');

const bookIssueSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  issueDate: { type: Date, default: Date.now },
  returnDate: { type: Date },
  status: { type: String, enum: ['issued', 'returned'], default: 'issued' },
  rentAmount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('BookIssue', bookIssueSchema);
