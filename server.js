const express = require('express');
const mongoose = require('mongoose'); // ✅ THIS IS MISSING
const cors = require('cors');
require('dotenv').config();

const jobRoutes = require('./routes/jobs');
const applicationRoutes = require('./routes/applications');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/jobs', jobRoutes);
app.use('/applications', applicationRoutes);

// MongoDB Connection
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
