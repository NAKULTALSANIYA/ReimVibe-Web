import express from 'express';
const router = express.Router();
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';

// Public routes
router.get('/', getProjects);
router.get('/:id', getProject);

// Admin routes (assuming authentication middleware)
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;
