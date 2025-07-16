const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Job = require('./models/Job');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Job Board API is running ✅');
});

// GET all jobs
app.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Seed test jobs (call this once)
app.get('/seed', async (req, res) => {
  try {
    await Job.deleteMany({});
    await Job.insertMany([
      {
        title: 'Frontend Developer',
        company: 'Tech Corp',
        location: 'Remote',
        type: 'Full-Time',
        description: 'Build UI components using React.'
      },
      {
        title: 'Backend Developer',
        company: 'Code House',
        location: 'Hybrid',
        type: 'Part-Time',
        description: 'Build APIs with Node.js and MongoDB.'
      }
    ]);
    res.send('✅ Jobs seeded');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Seeding failed' });
  }
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.error('MongoDB connection error:', err));
