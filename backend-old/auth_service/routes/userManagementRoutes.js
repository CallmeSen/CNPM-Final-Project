// backend/auth-service/routes/userManagementRoutes.js
const express = require("express");
const router = express.Router();
const userManagementController = require("../controllers/userManagementController");
const { protect } = require("../middlewares/auth");

// Middleware to check if user is superAdmin
const isSuperAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'superAdmin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Super Admin only.' });
  }
};

// All routes require authentication and superAdmin role
router.use(protect);
router.use(isSuperAdmin);

// Get all users (with optional filter)
router.get('/users', userManagementController.getAllUsers);

// Create new user
router.post('/users', userManagementController.createUser);

// Update user
router.put('/users/:id', userManagementController.updateUser);

// Delete user
router.delete('/users/:id', userManagementController.deleteUser);

// Get user activity logs
router.get('/users/:id/logs', userManagementController.getUserLogs);

// Update permissions (for admins)
router.patch('/users/:id/permissions', userManagementController.updatePermissions);

module.exports = router;
