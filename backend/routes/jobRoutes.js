import express from 'express';
const router = express.Router();
import {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js';

// Public routes
router.get('/', getJobs);
router.get('/:id', getJob);

// Admin routes (assuming authentication middleware)
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

export default router;
