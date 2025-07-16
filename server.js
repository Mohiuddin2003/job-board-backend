const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Job = require('./models/Job'); // ✅ Only once

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Job Board API is running ✅');
});

app.get('/jobs', async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

app.get('/seed', async (req, res) => {
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
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.error('MongoDB connection error:', err));
