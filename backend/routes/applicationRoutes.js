import express from 'express';
const router = express.Router();
import {
  getApplications,
  getApplication,
  createApplication,
  updateApplicationStatus,
  deleteApplication,
} from '../controllers/applicationController.js';

// Public routes
router.post('/', createApplication);

// Admin routes (assuming authentication middleware)
router.get('/', getApplications);
router.get('/:id', getApplication);
router.put('/:id/status', updateApplicationStatus);
router.delete('/:id', deleteApplication);

export default router;
