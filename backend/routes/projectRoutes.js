import express from 'express';
const router = express.Router();
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  uploadImage,
  uploadMiddleware,
} from '../controllers/projectController.js';

// Public routes
router.get('/', getProjects);
router.get('/:id', getProject);

// Image upload endpoint
router.post('/upload', uploadMiddleware, uploadImage);

// Admin routes with multipart form data support
router.post('/', uploadMiddleware, createProject);
router.put('/:id', uploadMiddleware, updateProject);
router.delete('/:id', deleteProject);

export default router;
