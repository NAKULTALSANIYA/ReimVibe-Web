import Application from '../models/Application.js';

// Get all applications
const getApplications = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Application.countDocuments();
    const applications = await Application.find().populate('jobId').skip(skip).limit(limit);

    if (applications.length === 0) {
      return res.json({ message: 'No applications found' });
    }

    const totalPages = Math.ceil(total / limit);

    res.json({
      data: applications,
      total,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single application
const getApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate('jobId');
    if (!application) return res.status(404).json({ message: 'Application not found' });
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create application
const createApplication = async (req, res) => {
  const application = new Application({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    resume: req.body.resume,
    coverLetter: req.body.coverLetter,
    jobId: req.body.jobId,
  });

  try {
    const newApplication = await application.save();
    res.status(201).json(newApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update application status
const updateApplicationStatus = async (req, res) => {
  try {
    const updateData = {};
    if (req.body.status !== undefined) updateData.status = req.body.status;

    const updatedApplication = await Application.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateData },
      { new: true }
    );

    if (!updatedApplication) return res.status(404).json({ message: 'Application not found' });

    res.json(updatedApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete application
const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found' });

    res.json({ message: 'Application deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getApplications,
  getApplication,
  createApplication,
  updateApplicationStatus,
  deleteApplication,
};
