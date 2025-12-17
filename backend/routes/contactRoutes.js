import express from 'express';
const router = express.Router();
import {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contactController.js';

// Public routes
router.post('/', createContact);

// Admin routes (assuming authentication middleware)
router.get('/', getContacts);
router.get('/:id', getContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

export default router;
