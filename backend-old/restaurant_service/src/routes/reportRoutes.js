import express from 'express';
import {
  getRevenueData,
  getTopSellingItems,
  getCustomerReviews,
  getSummary,
  createReview,
} from '../controllers/reportsController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// All routes are protected - require restaurant authentication
router.use(auth);

// GET /api/reports/revenue - Get revenue data by period
router.get('/revenue', getRevenueData);

// GET /api/reports/top-items - Get top selling food items
router.get('/top-items', getTopSellingItems);

// GET /api/reports/reviews - Get customer reviews
router.get('/reviews', getCustomerReviews);

// GET /api/reports/summary - Get summary statistics
router.get('/summary', getSummary);

// POST /api/reports/review - Create a new review
router.post('/review', createReview);

export default router;
