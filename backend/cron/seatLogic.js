const cron = require('node-cron');
const Member = require('../models/Member');
const Seat = require('../models/Seat');
const Attendance = require('../models/Attendance');
const { subDays, format } = require('date-fns');

// Run every midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Running Smart Seat Logic...');
  try {
    const members = await Member.find({ isActive: true });
    const today = new Date();

    for (const member of members) {
      // Check last 5 days attendance
      let absentCount = 0;
      for (let i = 1; i <= 5; i++) {
        const checkDate = format(subDays(today, i), 'yyyy-MM-dd');
        const attendance = await Attendance.findOne({ memberId: member._id, date: checkDate });
        if (!attendance || !attendance.checkIn) {
          absentCount++;
        }
      }

      if (absentCount === 5) {
        // Mark seat as inactive for reassignment
        if (member.seatId) {
          await Seat.findByIdAndUpdate(member.seatId, { status: 'available', isInactive: true });
          console.log(`Seat for member ${member.name} marked as inactive due to 5 days absence.`);
        }
      }
    }
  } catch (error) {
    console.error('Error in Smart Seat Logic:', error);
  }
});
