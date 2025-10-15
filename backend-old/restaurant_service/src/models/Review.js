import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    order: {
      type: String, // Order ID from order-service
      required: true,
    },
    customer: {
      name: {
        type: String,
        required: true,
      },
      customerId: {
        type: String,
        required: true,
      },
    },
    foodItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FoodItem',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Index for faster queries
reviewSchema.index({ restaurant: 1, createdAt: -1 });
reviewSchema.index({ rating: 1 });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
