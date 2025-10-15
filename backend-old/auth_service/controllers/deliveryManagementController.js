// backend/auth-service/controllers/deliveryManagementController.js
const DeliveryPersonnel = require("../models/DeliveryPersonnel");

// Get all delivery personnel
exports.getAllDelivery = async (req, res) => {
  try {
    const { status, vehicleType } = req.query;
    
    let query = {};
    if (status === 'available') query.isAvailable = true;
    if (status === 'busy') query.isAvailable = false;
    if (vehicleType) query.vehicleType = vehicleType;
    
    const deliveryPersonnel = await DeliveryPersonnel.find(query).select('-password');
    
    res.status(200).json(deliveryPersonnel);
  } catch (error) {
    console.error('Error fetching delivery personnel:', error);
    res.status(500).json({ message: 'Error fetching delivery personnel', error: error.message });
  }
};

// Get delivery by ID
exports.getDeliveryById = async (req, res) => {
  try {
    const delivery = await DeliveryPersonnel.findById(req.params.id).select('-password');
    if (!delivery) {
      return res.status(404).json({ message: 'Delivery personnel not found' });
    }
    res.status(200).json(delivery);
  } catch (error) {
    console.error('Error fetching delivery:', error);
    res.status(500).json({ message: 'Error fetching delivery', error: error.message });
  }
};

// Create new delivery personnel
exports.createDelivery = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, vehicleType, licenseNumber } = req.body;
    
    // Validate password length
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Mật khẩu phải có ít nhất 6 ký tự' });
    }
    
    // Check if delivery personnel exists
    const existingDelivery = await DeliveryPersonnel.findOne({ email });
    if (existingDelivery) {
      return res.status(400).json({ message: 'Delivery personnel with this email already exists' });
    }
    
    const newDelivery = await DeliveryPersonnel.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      vehicleType,
      licenseNumber,
      currentLocation: {
        type: "Point",
        coordinates: [0, 0] // Default location, should be updated
      }
    });
    
    const deliveryResponse = newDelivery.toObject();
    delete deliveryResponse.password;
    
    res.status(201).json({ 
      message: 'Delivery personnel created successfully', 
      delivery: deliveryResponse
    });
  } catch (error) {
    console.error('Error creating delivery personnel:', error);
    res.status(500).json({ message: 'Error creating delivery personnel', error: error.message });
  }
};

// Update delivery personnel
exports.updateDelivery = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    
    // Remove password from update if it's empty
    if (updateData.password === '' || !updateData.password) {
      delete updateData.password;
    } else {
      // Validate password length if it's being updated
      if (updateData.password.length < 6) {
        return res.status(400).json({ message: 'Mật khẩu phải có ít nhất 6 ký tự' });
      }
    }
    
    const delivery = await DeliveryPersonnel.findById(id);
    if (!delivery) {
      return res.status(404).json({ message: 'Delivery personnel not found' });
    }
    
    // Update fields
    Object.keys(updateData).forEach(key => {
      if (key !== '_id') {
        delivery[key] = updateData[key];
      }
    });
    
    await delivery.save();
    
    const deliveryResponse = delivery.toObject();
    delete deliveryResponse.password;
    
    res.status(200).json({ 
      message: 'Delivery personnel updated successfully', 
      delivery: deliveryResponse
    });
  } catch (error) {
    console.error('Error updating delivery personnel:', error);
    res.status(500).json({ message: 'Error updating delivery personnel', error: error.message });
  }
};

// Delete delivery personnel
exports.deleteDelivery = async (req, res) => {
  try {
    const { id } = req.params;
    
    const delivery = await DeliveryPersonnel.findByIdAndDelete(id);
    if (!delivery) {
      return res.status(404).json({ message: 'Delivery personnel not found' });
    }
    
    res.status(200).json({ message: 'Delivery personnel deleted successfully' });
  } catch (error) {
    console.error('Error deleting delivery personnel:', error);
    res.status(500).json({ message: 'Error deleting delivery personnel', error: error.message });
  }
};

// Update delivery location
exports.updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { longitude, latitude } = req.body;
    
    const delivery = await DeliveryPersonnel.findById(id);
    if (!delivery) {
      return res.status(404).json({ message: 'Delivery personnel not found' });
    }
    
    delivery.currentLocation = {
      type: "Point",
      coordinates: [parseFloat(longitude), parseFloat(latitude)]
    };
    
    await delivery.save();
    
    res.status(200).json({ 
      message: 'Location updated successfully',
      location: delivery.currentLocation
    });
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).json({ message: 'Error updating location', error: error.message });
  }
};

// Toggle availability
exports.toggleAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    
    const delivery = await DeliveryPersonnel.findById(id);
    if (!delivery) {
      return res.status(404).json({ message: 'Delivery personnel not found' });
    }
    
    delivery.isAvailable = !delivery.isAvailable;
    await delivery.save();
    
    const deliveryResponse = delivery.toObject();
    delete deliveryResponse.password;
    
    res.status(200).json({ 
      message: 'Availability updated successfully',
      delivery: deliveryResponse
    });
  } catch (error) {
    console.error('Error toggling availability:', error);
    res.status(500).json({ message: 'Error toggling availability', error: error.message });
  }
};

// Get delivery statistics
exports.getDeliveryStats = async (req, res) => {
  try {
    const totalDelivery = await DeliveryPersonnel.countDocuments();
    const availableDelivery = await DeliveryPersonnel.countDocuments({ isAvailable: true });
    const busyDelivery = totalDelivery - availableDelivery;
    
    const vehicleStats = await DeliveryPersonnel.aggregate([
      {
        $group: {
          _id: "$vehicleType",
          count: { $sum: 1 }
        }
      }
    ]);
    
    const avgRating = await DeliveryPersonnel.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" }
        }
      }
    ]);
    
    const topPerformers = await DeliveryPersonnel.find()
      .select('-password')
      .sort({ rating: -1, totalDeliveries: -1 })
      .limit(5);
    
    res.status(200).json({
      totalDelivery,
      availableDelivery,
      busyDelivery,
      vehicleStats,
      averageRating: avgRating.length > 0 ? avgRating[0].avgRating : 0,
      topPerformers
    });
  } catch (error) {
    console.error('Error fetching delivery stats:', error);
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
};

// Find nearby delivery personnel
exports.findNearbyDelivery = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 5000 } = req.query; // maxDistance in meters
    
    if (!longitude || !latitude) {
      return res.status(400).json({ message: 'Longitude and latitude are required' });
    }
    
    const nearbyDelivery = await DeliveryPersonnel.find({
      isAvailable: true,
      currentLocation: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      }
    }).select('-password').limit(10);
    
    res.status(200).json(nearbyDelivery);
  } catch (error) {
    console.error('Error finding nearby delivery:', error);
    res.status(500).json({ message: 'Error finding nearby delivery', error: error.message });
  }
};
