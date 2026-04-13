const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/User');
const Member = require('./models/Member');
const Seat = require('./models/Seat');

// Load env from current directory
dotenv.config({ path: path.join(__dirname, '.env') });

const seedData = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in .env file');
        }
        
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing users
        await User.deleteMany({});
        await Member.deleteMany({});
        await Seat.deleteMany({});
        console.log('Cleared existing data');

        // Create Admin
        const admin = await User.create({
            name: 'Library Admin',
            email: 'admin@shanti.in',
            password: 'password123',
            role: 'admin'
        });
        console.log('Admin user created: admin@shanti.in / password123');

        // Create some seats
        const seats = [];
        for (let i = 1; i <= 20; i++) {
            seats.push({
                seatNumber: `S-${i}`,
                type: 'day',
                status: 'available'
            });
        }
        const createdSeats = await Seat.insertMany(seats);
        console.log('Created 20 seats');

        // Create a Member for the student
        const member = await Member.create({
            name: 'Aman Singh',
            phone: '8887725829',
            membershipType: 'day',
            planType: 'half-yearly',
            seatId: createdSeats[11]._id, // S-12
            feeStatus: 'paid',
            isActive: true,
            expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)
        });

        // Update seat status
        await Seat.findByIdAndUpdate(createdSeats[11]._id, { 
            status: 'occupied', 
            assignedMemberId: member._id 
        });

        // Create Student User
        const student = await User.create({
            name: 'Aman Singh',
            email: 'aman@shanti.in',
            password: 'password123',
            role: 'student',
            memberId: member._id
        });
        console.log('Student user created: aman@shanti.in / password123');

        console.log('Seeding completed successfully');
        process.exit();
    } catch (error) {
        console.error('Seeding failed:', error.message);
        process.exit(1);
    }
};

seedData();
