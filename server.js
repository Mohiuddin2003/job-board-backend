const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Job = require('./models/Job');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ This is the route your frontend calls
app.get('/jobs', async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// ✅ Optional test route
app.get('/', (req, res) => {
  res.send('Job Board API is running ✅');
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
