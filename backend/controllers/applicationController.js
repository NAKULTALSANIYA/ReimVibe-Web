import Application from '../models/Application.js';

// Get all applications
const getApplications = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const total = await Application.count();
    const applications = await Application.findAll({ 
      limit, 
      offset,
      include: [{
        model: Application.sequelize.models.Job,
        as: 'job',
        attributes: ['id', 'title']
      }]
    });

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
    const application = await Application.findByPk(req.params.id, {
      include: [{
        model: Application.sequelize.models.Job,
        as: 'job',
        attributes: ['id', 'title']
      }]
    });
    if (!application) return res.status(404).json({ message: 'Application not found' });
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create application
const createApplication = async (req, res) => {
  try {
    const newApplication = await Application.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      resume: req.body.resume,
      coverLetter: req.body.coverLetter,
      jobId: req.body.jobId,
    });
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

    await Application.update(updateData, { where: { id: req.params.id } });
    const updatedApplication = await Application.findByPk(req.params.id);

    if (!updatedApplication) return res.status(404).json({ message: 'Application not found' });

    res.json(updatedApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete application
const deleteApplication = async (req, res) => {
  try {
    const deleted = await Application.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Application not found' });

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
