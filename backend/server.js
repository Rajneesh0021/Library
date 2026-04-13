require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('./cron/seatLogic'); // Initialize Cron Jobs


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const userRoutes = require('./routes/userRoutes');
const memberRoutes = require('./routes/memberRoutes');
const seatRoutes = require('./routes/seatRoutes');
// const attendanceRoutes = require('./routes/attendanceRoutes');
// const bookRoutes = require('./routes/bookRoutes');

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/seats', seatRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('Library Management System API is running...');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
