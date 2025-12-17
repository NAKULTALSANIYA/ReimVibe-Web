import Job from '../models/Job.js';

// Get all jobs
const getJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Job.countDocuments();
    const jobs = await Job.find().skip(skip).limit(limit);

    if (jobs.length === 0) {
      return res.json({ message: 'No jobs found' });
    }

    const totalPages = Math.ceil(total / limit);

    res.json({
      data: jobs,
      total,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single job
const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create job
const createJob = async (req, res) => {
  const job = new Job({
    title: req.body.title,
    type: req.body.type,
    location: req.body.location,
    description: req.body.description,
    status: req.body.status,
  });

  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update job
const updateJob = async (req, res) => {
  try {
    const updateData = {};
    if (req.body.title !== undefined) updateData.title = req.body.title;
    if (req.body.type !== undefined) updateData.type = req.body.type;
    if (req.body.location !== undefined) updateData.location = req.body.location;
    if (req.body.description !== undefined) updateData.description = req.body.description;
    if (req.body.status !== undefined) updateData.status = req.body.status;

    const updatedJob = await Job.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateData },
      { new: true }
    );

    if (!updatedJob) return res.status(404).json({ message: 'Job not found' });

    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
