import express from 'express';
const router = express.Router();
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';

// Public routes
router.get('/', getServices);
router.get('/:id', getService);

// Admin routes (assuming authentication middleware)
router.post('/', createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

export default router;
