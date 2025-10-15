// backend/auth-service/controllers/deliveryFeeController.js
const DeliveryFee = require("../models/DeliveryFee");

// Get all delivery fees
exports.getAllFees = async (req, res) => {
  try {
    const fees = await DeliveryFee.find();
    res.status(200).json(fees);
  } catch (error) {
    console.error('Error fetching fees:', error);
    res.status(500).json({ message: 'Error fetching fees', error: error.message });
  }
};

// Get active delivery fees
exports.getActiveFees = async (req, res) => {
  try {
    const fees = await DeliveryFee.find({ isActive: true });
    res.status(200).json(fees);
  } catch (error) {
    console.error('Error fetching active fees:', error);
    res.status(500).json({ message: 'Error fetching active fees', error: error.message });
  }
};

// Create delivery fee
exports.createFee = async (req, res) => {
  try {
    const newFee = await DeliveryFee.create(req.body);
    res.status(201).json({ 
      message: 'Delivery fee created successfully', 
      fee: newFee 
    });
  } catch (error) {
    console.error('Error creating fee:', error);
    res.status(500).json({ message: 'Error creating fee', error: error.message });
  }
};

// Update delivery fee
exports.updateFee = async (req, res) => {
  try {
    const { id } = req.params;
    const fee = await DeliveryFee.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!fee) {
      return res.status(404).json({ message: 'Delivery fee not found' });
    }
    
    res.status(200).json({ 
      message: 'Delivery fee updated successfully', 
      fee 
    });
  } catch (error) {
    console.error('Error updating fee:', error);
    res.status(500).json({ message: 'Error updating fee', error: error.message });
  }
};

// Delete delivery fee
exports.deleteFee = async (req, res) => {
  try {
    const { id } = req.params;
    const fee = await DeliveryFee.findByIdAndDelete(id);
    
    if (!fee) {
      return res.status(404).json({ message: 'Delivery fee not found' });
    }
    
    res.status(200).json({ message: 'Delivery fee deleted successfully' });
  } catch (error) {
    console.error('Error deleting fee:', error);
    res.status(500).json({ message: 'Error deleting fee', error: error.message });
  }
};

// Calculate delivery fee
exports.calculateFee = async (req, res) => {
  try {
    const { distance, vehicleType, isRushHour } = req.query;
    
    if (!distance) {
      return res.status(400).json({ message: 'Distance is required' });
    }
    
    // Find applicable fee
    let feeConfig = await DeliveryFee.findOne({ 
      isActive: true, 
      vehicleType: vehicleType || 'all'
    });
    
    // Fallback to 'all' if specific vehicle type not found
    if (!feeConfig && vehicleType) {
      feeConfig = await DeliveryFee.findOne({ 
        isActive: true, 
        vehicleType: 'all'
      });
    }
    
    if (!feeConfig) {
      return res.status(404).json({ message: 'No active delivery fee configuration found' });
    }
    
    const calculatedFee = feeConfig.calculateFee(parseFloat(distance), isRushHour === 'true');
    
    res.status(200).json({
      distance: parseFloat(distance),
      baseFee: feeConfig.baseFee,
      baseDistance: feeConfig.baseDistance,
      perKmFee: feeConfig.perKmFee,
      isRushHour: isRushHour === 'true',
      rushHourMultiplier: feeConfig.rushHourMultiplier,
      calculatedFee,
      vehicleType: feeConfig.vehicleType
    });
  } catch (error) {
    console.error('Error calculating fee:', error);
    res.status(500).json({ message: 'Error calculating fee', error: error.message });
  }
};
