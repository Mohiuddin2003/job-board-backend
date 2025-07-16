const mongoose = require('mongoose');
const Job = require('../models/Job');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Job.deleteMany({});
    await Job.insertMany([
      {
        title: 'Frontend Developer',
        company: 'Tech Corp',
        location: 'Remote',
        description: 'Build UI components using React.',
        type: 'Remote'
      },
      {
        title: 'Backend Developer',
        company: 'SoftHouse',
        location: 'New York',
        description: 'Develop REST APIs with Node.js.',
        type: 'Full-Time'
      },
      {
        title: 'UI/UX Designer',
        company: 'Designify',
        location: 'San Francisco',
        description: 'Design interfaces and user flows.',
        type: 'Part-Time'
      }
    ]);
    console.log('Jobs seeded successfully!');
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
