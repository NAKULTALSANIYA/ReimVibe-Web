import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header first
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  // Also check for token in cookies
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ 
      message: 'Not authorized, no token' 
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    // Get admin from token (exclude password) - use findByPk instead of findById
    req.admin = await Admin.findByPk(decoded.id, {
      attributes: { exclude: ['password'] }
    });

    if (!req.admin) {
      return res.status(401).json({ 
        message: 'Not authorized, admin not found' 
      });
    }

    // Check if admin is active
    if (!req.admin.isActive) {
      return res.status(401).json({ 
        message: 'Not authorized, admin account is inactive' 
      });
    }

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ 
      message: 'Not authorized, token failed' 
    });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({ 
        message: 'Not authorized' 
      });
    }

    if (!roles.includes(req.admin.role)) {
      return res.status(403).json({ 
        message: `Access denied. Required roles: ${roles.join(', ')}` 
      });
    }

    next();
  };
};
