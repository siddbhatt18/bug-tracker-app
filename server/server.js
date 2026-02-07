const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const ticketRoutes = require('./routes/tickets');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: [
    "https://bug-tracker-app-lime.vercel.app", // Your Vercel URL
    "http://localhost:5173"                    // Your Localhost (for testing)
  ],
  credentials: true // Allow cookies/headers
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/comments', require('./routes/comments'));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Test Route
app.get('/', (req, res) => {
  res.send('Bug Tracker API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});
