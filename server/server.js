const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Optional but recommended
const weatherRoute = require('./routes/weather'); // Import route file

const app = express(); // ✅ This should come BEFORE using `app`

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/weatherDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error("❌ MongoDB error:", err));

// ✅ Use the weather route here
app.use('/api/weather', weatherRoute);

// Start the server
app.listen(5000, () => {
  console.log('🚀 Server running at http://localhost:5000');
});
