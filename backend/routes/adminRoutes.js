import express from 'express';
import {
  setupAdmin,
  loginAdmin,
  getAdminProfile,
  createAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin
} from '../controllers/adminController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes (no authentication required)
router.post('/setup', setupAdmin);
router.post('/login', loginAdmin);

// Protected routes (authentication required)
router.post('/logout', protect, (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
  res.json({ message: 'Logged out successfully' });
});
router.get('/profile', protect, getAdminProfile);
router.get('/all', protect, getAllAdmins);
router.post('/create', protect, createAdmin);
router.put('/:id', protect, updateAdmin);
router.delete('/:id', protect, deleteAdmin);

export default router;
