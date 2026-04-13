const mongoose = require('mongoose');
const User = require('../models/User');
const Seat = require('../models/Seat');
const dotenv = require('dotenv');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear existing data
    await User.deleteMany();
    await Seat.deleteMany();

    // Create Admin
    const admin = await User.create({
      name: 'Shanti Library Admin',
      email: 'admin@library.com',
      password: 'admin123',
      role: 'admin'
    });

    // Create student
    const student = await User.create({
      name: 'John Doe',
      email: 'john@student.com',
      password: 'student123',
      role: 'student'
    });

    // Create Seats
    const seats = [];
    for (let i = 1; i <= 20; i++) {
      seats.push({
        seatNumber: `D${i}`,
        type: 'day',
        status: i < 5 ? 'occupied' : 'available'
      });
    }
    for (let i = 1; i <= 20; i++) {
        seats.push({
          seatNumber: `N${i}`,
          type: 'night',
          status: 'available'
        });
      }
    await Seat.insertMany(seats);

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
