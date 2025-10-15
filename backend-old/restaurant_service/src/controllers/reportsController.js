import Order from '../models/Order.js';
import FoodItem from '../models/FoodItem.js';
import Review from '../models/Review.js';

// Helper function to get date range based on period
const getDateRange = (period, startDate, endDate) => {
  const now = new Date();
  let start, end;

  if (startDate && endDate) {
    start = new Date(startDate);
    end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
  } else {
    end = now;
    
    switch (period) {
      case 'day':
        start = new Date(now.setHours(0, 0, 0, 0));
        break;
      case 'week':
        start = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        start = new Date(now.setDate(now.getDate() - 30));
        break;
      default:
        start = new Date(now.setDate(now.getDate() - 7));
    }
  }

  return { start, end };
};

// Get revenue data
export const getRevenueData = async (req, res) => {
  try {
    const { period = 'week', startDate, endDate } = req.query;
    const restaurantId = req.user.restaurantId;

    const { start, end } = getDateRange(period, startDate, endDate);

    // Aggregate orders by date
    const revenueData = await Order.aggregate([
      {
        $match: {
          restaurantId: restaurantId,
          createdAt: { $gte: start, $lte: end },
          paymentStatus: 'Paid',
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          revenue: { $sum: '$totalPrice' },
          orders: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          _id: 0,
          date: '$_id',
          revenue: 1,
          orders: 1,
        },
      },
    ]);

    res.json(revenueData);
  } catch (error) {
    console.error('Error fetching revenue data:', error);
    res.status(500).json({ message: 'Error fetching revenue data', error: error.message });
  }
};

// Get top selling items
export const getTopSellingItems = async (req, res) => {
  try {
    const { limit = 5, period = 'month', startDate, endDate } = req.query;
    const restaurantId = req.user.restaurantId;

    const { start, end } = getDateRange(period, startDate, endDate);

    // Aggregate orders to find top items
    const topItems = await Order.aggregate([
      {
        $match: {
          restaurantId: restaurantId,
          createdAt: { $gte: start, $lte: end },
          paymentStatus: 'Paid',
        },
      },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.foodId',
          quantity: { $sum: '$items.quantity' },
          revenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } },
        },
      },
      { $sort: { quantity: -1 } },
      { $limit: parseInt(limit) },
    ]);

    // Populate with food item details
    const populatedItems = await Promise.all(
      topItems.map(async (item) => {
        const foodItem = await FoodItem.findById(item._id);
        return {
          _id: item._id,
          name: foodItem?.name || 'Unknown Item',
          quantity: item.quantity,
          revenue: item.revenue,
          image: foodItem?.image || '',
          category: foodItem?.category || '',
        };
      })
    );

    res.json(populatedItems);
  } catch (error) {
    console.error('Error fetching top selling items:', error);
    res.status(500).json({ message: 'Error fetching top items', error: error.message });
  }
};

// Get customer reviews
export const getCustomerReviews = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const restaurantId = req.user.restaurantId;

    const reviews = await Review.find({ restaurant: restaurantId })
      .populate('foodItem', 'name')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    const formattedReviews = reviews.map((review) => ({
      customer: review.customer.name,
      customerId: review.customer.customerId,
      rating: review.rating,
      comment: review.comment,
      date: review.createdAt.toISOString().split('T')[0],
      item: review.foodItem?.name || 'Unknown Item',
      orderId: review.order,
    }));

    res.json(formattedReviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};

// Get summary statistics
export const getSummary = async (req, res) => {
  try {
    const { period = 'week', startDate, endDate } = req.query;
    const restaurantId = req.user.restaurantId;

    const { start, end } = getDateRange(period, startDate, endDate);

    // Get total revenue and orders
    const orderStats = await Order.aggregate([
      {
        $match: {
          restaurantId: restaurantId,
          createdAt: { $gte: start, $lte: end },
          paymentStatus: 'Paid',
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
          totalOrders: { $sum: 1 },
        },
      },
    ]);

    // Get average rating
    const ratingStats = await Review.aggregate([
      {
        $match: {
          restaurant: restaurantId,
          createdAt: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    const stats = orderStats[0] || { totalRevenue: 0, totalOrders: 0 };
    const ratings = ratingStats[0] || { averageRating: 0, totalReviews: 0 };

    const summary = {
      totalRevenue: stats.totalRevenue || 0,
      totalOrders: stats.totalOrders || 0,
      averageOrderValue: stats.totalOrders > 0 ? stats.totalRevenue / stats.totalOrders : 0,
      averageRating: ratings.averageRating || 0,
      totalReviews: ratings.totalReviews || 0,
    };

    res.json(summary);
  } catch (error) {
    console.error('Error fetching summary:', error);
    res.status(500).json({ message: 'Error fetching summary', error: error.message });
  }
};

// Create a review (called from order-service after delivery)
export const createReview = async (req, res) => {
  try {
    const { orderId, customerId, customerName, foodItemId, rating, comment } = req.body;
    const restaurantId = req.user.restaurantId;

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Check if review already exists for this order and food item
    const existingReview = await Review.findOne({
      order: orderId,
      foodItem: foodItemId,
      'customer.customerId': customerId,
    });

    if (existingReview) {
      return res.status(400).json({ message: 'Review already submitted for this item' });
    }

    const review = new Review({
      restaurant: restaurantId,
      order: orderId,
      customer: {
        name: customerName,
        customerId: customerId,
      },
      foodItem: foodItemId,
      rating,
      comment,
    });

    await review.save();

    res.status(201).json({ message: 'Review created successfully', review });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Error creating review', error: error.message });
  }
};
