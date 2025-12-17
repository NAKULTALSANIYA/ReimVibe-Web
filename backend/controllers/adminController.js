import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

// Generate JWT token
const generateToken = (admin) => {
  return jwt.sign(
    { 
      id: admin._id, 
      email: admin.email, 
      role: admin.role 
    },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );
};

// @desc    Create initial admin user
// @route   POST /api/admin/setup
// @access  Public (only works if no admin exists)
export const setupAdmin = async (req, res) => {
  try {
    // Check if any admin already exists
    const existingAdmins = await Admin.countDocuments();
    if (existingAdmins > 0) {
      return res.status(400).json({ 
        message: 'Admin setup already completed. Admin users already exist.' 
      });
    }

    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ 
        message: 'Please provide username, email, and password' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        message: 'Password must be at least 6 characters long' 
      });
    }

    // Check if admin with email or username already exists
    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { username }]
    });

    if (existingAdmin) {
      return res.status(400).json({ 
        message: 'Admin with this email or username already exists' 
      });
    }

    // Create admin
    const admin = await Admin.create({
      username,
      email,
      password,
      role: 'superadmin'
    });

    // Generate token
    const token = generateToken(admin);

    res.status(201).json({
      message: 'Admin user created successfully',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Admin setup error:', error);
    res.status(500).json({ 
      message: 'Server error during admin setup',
      error: error.message 
    });
  }
};

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Please provide email and password' 
      });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email, isActive: true });
    if (!admin) {
      return res.status(401).json({ 
        message: 'Invalid credentials' 
      });
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        message: 'Invalid credentials' 
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate token
    const token = generateToken(admin);

    res.json({
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ 
      message: 'Server error during login',
      error: error.message 
    });
  }
};

// @desc    Get current admin profile
// @route   GET /api/admin/profile
// @access  Private
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.json({
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive,
        lastLogin: admin.lastLogin,
        createdAt: admin.createdAt
      }
    });
  } catch (error) {
    console.error('Get admin profile error:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    });
  }
};

// @desc    Create new admin user (only superadmin)
// @route   POST /api/admin/create
// @access  Private (Superadmin only)
export const createAdmin = async (req, res) => {
  try {
    // Check if current user is superadmin
    if (req.admin.role !== 'superadmin') {
      return res.status(403).json({ 
        message: 'Access denied. Only superadmin can create admin users.' 
      });
    }

    const { username, email, password, role = 'admin' } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ 
        message: 'Please provide username, email, and password' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        message: 'Password must be at least 6 characters long' 
      });
    }

    // Check if admin with email or username already exists
    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { username }]
    });

    if (existingAdmin) {
      return res.status(400).json({ 
        message: 'Admin with this email or username already exists' 
      });
    }

    // Create admin
    const admin = await Admin.create({
      username,
      email,
      password,
      role
    });

    res.status(201).json({
      message: 'Admin user created successfully',
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive
      }
    });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({ 
      message: 'Server error during admin creation',
      error: error.message 
    });
  }
};

// @desc    Get all admin users (only superadmin)
// @route   GET /api/admin/all
// @access  Private (Superadmin only)
export const getAllAdmins = async (req, res) => {
  try {
    // Check if current user is superadmin
    if (req.admin.role !== 'superadmin') {
      return res.status(403).json({ 
        message: 'Access denied. Only superadmin can view all admin users.' 
      });
    }

    const admins = await Admin.find().select('-password').sort({ createdAt: -1 });

    res.json({
      count: admins.length,
      admins
    });
  } catch (error) {
    console.error('Get all admins error:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    });
  }
};

// @desc    Update admin user (only superadmin)
// @route   PUT /api/admin/:id
// @access  Private (Superadmin only)
export const updateAdmin = async (req, res) => {
  try {
    // Check if current user is superadmin
    if (req.admin.role !== 'superadmin') {
      return res.status(403).json({ 
        message: 'Access denied. Only superadmin can update admin users.' 
      });
    }

    const { id } = req.params;
    const { username, email, role, isActive } = req.body;

    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Update fields
    if (username) admin.username = username;
    if (email) admin.email = email;
    if (role) admin.role = role;
    if (typeof isActive === 'boolean') admin.isActive = isActive;

    await admin.save();

    res.json({
      message: 'Admin updated successfully',
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive
      }
    });
  } catch (error) {
    console.error('Update admin error:', error);
    res.status(500).json({ 
      message: 'Server error during admin update',
      error: error.message 
    });
  }
};

// @desc    Delete admin user (only superadmin)
// @route   DELETE /api/admin/:id
// @access  Private (Superadmin only)
export const deleteAdmin = async (req, res) => {
  try {
    // Check if current user is superadmin
    if (req.admin.role !== 'superadmin') {
      return res.status(403).json({ 
        message: 'Access denied. Only superadmin can delete admin users.' 
      });
    }

    const { id } = req.params;

    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Prevent deleting yourself
    if (admin._id.toString() === req.admin.id) {
      return res.status(400).json({ 
        message: 'You cannot delete your own account' 
      });
    }

    await Admin.findByIdAndDelete(id);

    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Delete admin error:', error);
    res.status(500).json({ 
      message: 'Server error during admin deletion',
      error: error.message 
    });
  }
};
