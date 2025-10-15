// backend/auth-service/routes/deliveryManagementRoutes.js
const express = require("express");
const router = express.Router();
const deliveryController = require("../controllers/deliveryManagementController");
const deliveryFeeController = require("../controllers/deliveryFeeController");
const { protect } = require("../middlewares/auth");

// Middleware to check if user is superAdmin or admin
const isAdminOrSuperAdmin = (req, res, next) => {
  if (req.user && (req.user.role === 'superAdmin' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin only.' });
  }
};

// All routes require authentication and admin role
router.use(protect);
router.use(isAdminOrSuperAdmin);

// Get all delivery personnel
router.get('/delivery', deliveryController.getAllDelivery);

// Get delivery statistics
router.get('/delivery/stats', deliveryController.getDeliveryStats);

// Find nearby delivery personnel
router.get('/delivery/nearby', deliveryController.findNearbyDelivery);

// Get single delivery personnel
router.get('/delivery/:id', deliveryController.getDeliveryById);

// Create new delivery personnel
router.post('/delivery', deliveryController.createDelivery);

// Update delivery personnel
router.put('/delivery/:id', deliveryController.updateDelivery);

// Delete delivery personnel
router.delete('/delivery/:id', deliveryController.deleteDelivery);

// Update delivery location
router.patch('/delivery/:id/location', deliveryController.updateLocation);

// Toggle availability
router.patch('/delivery/:id/availability', deliveryController.toggleAvailability);

// Delivery Fee Management
router.get('/delivery-fees', deliveryFeeController.getAllFees);
router.get('/delivery-fees/active', deliveryFeeController.getActiveFees);
router.get('/delivery-fees/calculate', deliveryFeeController.calculateFee);
router.post('/delivery-fees', deliveryFeeController.createFee);
router.put('/delivery-fees/:id', deliveryFeeController.updateFee);
router.delete('/delivery-fees/:id', deliveryFeeController.deleteFee);

module.exports = router;
