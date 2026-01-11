import Service from '../models/Service.js';

// Get all services
const getServices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const total = await Service.count();
    const services = await Service.findAll({ limit, offset });

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
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create service
const createService = async (req, res) => {
  try {
    const newService = await Service.create({
      title: req.body.title,
      description: req.body.description,
      icon: req.body.icon || 'code',
    });
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
    if (req.body.icon !== undefined) updateData.icon = req.body.icon;

    await Service.update(updateData, { where: { id: req.params.id } });
    const updatedService = await Service.findByPk(req.params.id);

    if (!updatedService) return res.status(404).json({ message: 'Service not found' });

    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete service
const deleteService = async (req, res) => {
  try {
    const deleted = await Service.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Service not found' });

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
