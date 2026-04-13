# Shanti Digital Library & Seat Allocation System

A production-ready MERN stack application for managing library memberships, seat allocations, attendance, and books.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (running locally or a cloud URI)

### Backend Setup
1. Navigate to the backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Configure your `.env` file (already created with defaults).
4. Seed the database (Optional but recommended for demo):
   ```bash
   node utils/seed.js
   ```
5. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Start the dev server:
   ```bash
   npm run dev
   ```

## 🧠 Core Features
- **Admin Dashboard**: Real-time seat status, revenue tracking, member management.
- **Student Dashboard**: Check-in, attendance logs, seat details.
- **Smart Seat Logic**: Automatic seat marking for inactivity (>5 days).
- **Fee Management**: Track plans (Monthly/6-Mo/1-Year) & expiry.
- **Book Rent System**: Calculate rent based on usage duration.

## 🛠 Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS, Lucide Icons.
- **Backend**: Node.js, Express, MongoDB (Mongoose).
- **Automation**: Node-cron for background tasks.

