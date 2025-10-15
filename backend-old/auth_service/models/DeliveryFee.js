// backend/auth-service/models/DeliveryFee.js
const mongoose = require("mongoose");

const deliveryFeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  baseDistance: {
    type: Number, // km
    required: true,
    default: 3,
  },
  baseFee: {
    type: Number, // VND or USD
    required: true,
    default: 15000,
  },
  perKmFee: {
    type: Number, // Additional fee per km after base distance
    required: true,
    default: 5000,
  },
  vehicleType: {
    type: String,
    enum: ["bike", "scooter", "car", "bicycle", "all"],
    default: "all",
  },
  rushHourMultiplier: {
    type: Number,
    default: 1.5, // 50% increase during rush hours
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  effectiveFrom: {
    type: Date,
    default: Date.now,
  },
  effectiveTo: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

// Method to calculate delivery fee
deliveryFeeSchema.methods.calculateFee = function(distance, isRushHour = false) {
  let fee = this.baseFee;
  
  if (distance > this.baseDistance) {
    const extraDistance = distance - this.baseDistance;
    fee += extraDistance * this.perKmFee;
  }
  
  if (isRushHour) {
    fee *= this.rushHourMultiplier;
  }
  
  return Math.round(fee);
};

module.exports = mongoose.model("DeliveryFee", deliveryFeeSchema);
