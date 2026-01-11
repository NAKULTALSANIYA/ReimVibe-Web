import Project from '../models/Project.js';
import upload from '../config/upload.js';

// Build absolute URLs for uploaded assets
const getBaseUrl = (req) => `${req.protocol}://${req.get('host')}`;
const formatImageUrl = (req, imagePath) => {
  if (!imagePath) return imagePath;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
  const normalized = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${getBaseUrl(req)}${normalized}`;
};

// Get all projects
const getProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const total = await Project.count();
    const projects = await Project.findAll({ limit, offset });

    const projectsData = projects.map((project) => ({
      ...project.get({ plain: true }),
      image: formatImageUrl(req, project.image),
    }));

    const totalPages = Math.ceil(total / limit);

    res.json({
      data: projectsData,
      total,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single project
const getProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({
      ...project.get({ plain: true }),
      image: formatImageUrl(req, project.image),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create project with optional image upload
const createProject = async (req, res) => {
  try {
    const { title, description, link } = req.body;
    
    // Handle image upload or use provided URL
    let image = req.body.image;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    if (!image) {
      return res.status(400).json({ message: 'Project image is required' });
    }

    const newProject = await Project.create({
      title,
      description,
      image,
      link,
    });
    res.status(201).json({
      ...newProject.get({ plain: true }),
      image: formatImageUrl(req, newProject.image),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update project with optional image upload
const updateProject = async (req, res) => {
  try {
    const updateData = {};
    if (req.body.title !== undefined) updateData.title = req.body.title;
    if (req.body.description !== undefined) updateData.description = req.body.description;
    if (req.body.link !== undefined) updateData.link = req.body.link;
    
    // Handle image upload - only update if new file is provided
    // Otherwise keep the existing image from req.body.image
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    } else if (req.body.image !== undefined) {
      updateData.image = req.body.image;
    }

    await Project.update(updateData, { where: { id: req.params.id } });
    const updatedProject = await Project.findByPk(req.params.id);

    if (!updatedProject) return res.status(404).json({ message: 'Project not found' });

    res.json({
      ...updatedProject.get({ plain: true }),
      image: formatImageUrl(req, updatedProject.image),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete project
const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Project not found' });

    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload image endpoint (separate endpoint for frontend uploads)
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const imageUrl = formatImageUrl(req, `/uploads/${req.file.filename}`);
    res.json({ 
      success: true, 
      imageUrl,
      message: 'Image uploaded successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export upload middleware for routes
export const uploadMiddleware = upload.single('image');

export {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  uploadImage,
};
