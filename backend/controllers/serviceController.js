import Service from '../models/Service.js';

// Get all services
const getServices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Service.countDocuments();
    const services = await Service.find().skip(skip).limit(limit);

    if (services.length === 0) {
      return res.json({ message: 'No services found' });
    }

    const totalPages = Math.ceil(total / limit);

    res.json({
      data: services,
      total,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single service
const getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create service
const createService = async (req, res) => {
  const service = new Service({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update service
const updateService = async (req, res) => {
  try {
    const updateData = {};
    if (req.body.title !== undefined) updateData.title = req.body.title;
    if (req.body.description !== undefined) updateData.description = req.body.description;

    const updatedService = await Service.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateData },
      { new: true }
    );

    if (!updatedService) return res.status(404).json({ message: 'Service not found' });

    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete service
const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
};
