// backend/auth-service/controllers/userManagementController.js
const Customer = require("../models/Customer");
const Admin = require("../models/Admin");
const RestaurantAdmin = require("../models/RestaurantAdmin");
const DeliveryPersonnel = require("../models/DeliveryPersonnel");
const { generateToken } = require("../utils/jwt");

// Get all users with filters
exports.getAllUsers = async (req, res) => {
  try {
    const { userType } = req.query;
    
    let users = [];
    
    if (!userType || userType === 'customer') {
      const customers = await Customer.find().select('-password');
      users = [...users, ...customers.map(c => ({ ...c.toObject(), userType: 'customer' }))];
    }
    
    if (!userType || userType === 'admin') {
      const admins = await Admin.find().select('-password');
      users = [...users, ...admins.map(a => ({ ...a.toObject(), userType: 'admin' }))];
    }
    
    if (!userType || userType === 'restaurant') {
      const restaurants = await RestaurantAdmin.find().select('-password');
      users = [...users, ...restaurants.map(r => ({ ...r.toObject(), userType: 'restaurant' }))];
    }
    
    if (!userType || userType === 'delivery') {
      const delivery = await DeliveryPersonnel.find().select('-password');
      users = [...users, ...delivery.map(d => ({ ...d.toObject(), userType: 'delivery' }))];
    }
    
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Create new user
exports.createUser = async (req, res) => {
  try {
    const { userType, firstName, lastName, email, phone, password, role, permissions, restaurantId } = req.body;
    
    // Validate password length
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Mật khẩu phải có ít nhất 6 ký tự' });
    }
    
    let newUser;
    
    switch(userType) {
      case 'customer':
        // Check if customer exists
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
          return res.status(400).json({ message: 'Customer with this email already exists' });
        }
        newUser = await Customer.create({ firstName, lastName, email, phone, password });
        break;
        
      case 'admin':
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
          return res.status(400).json({ message: 'Admin with this email already exists' });
        }
        newUser = await Admin.create({ firstName, lastName, email, phone, password, role, permissions });
        break;
        
      case 'restaurant':
        const existingRestaurant = await RestaurantAdmin.findOne({ email });
        if (existingRestaurant) {
          return res.status(400).json({ message: 'Restaurant admin with this email already exists' });
        }
        newUser = await RestaurantAdmin.create({ firstName, lastName, email, phone, password, restaurantId });
        break;
        
      case 'delivery':
        const existingDelivery = await DeliveryPersonnel.findOne({ email });
        if (existingDelivery) {
          return res.status(400).json({ message: 'Delivery personnel with this email already exists' });
        }
        newUser = await DeliveryPersonnel.create({ firstName, lastName, email, phone, password });
        break;
        
      default:
        return res.status(400).json({ message: 'Invalid user type' });
    }
    
    const userResponse = newUser.toObject();
    delete userResponse.password;
    
    res.status(201).json({ 
      message: `${userType} created successfully`, 
      user: { ...userResponse, userType }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userType, ...updateData } = req.body;
    
    // Remove password from update if it's empty
    if (updateData.password === '' || !updateData.password) {
      delete updateData.password;
    } else {
      // Validate password length if it's being updated
      if (updateData.password.length < 6) {
        return res.status(400).json({ message: 'Mật khẩu phải có ít nhất 6 ký tự' });
      }
    }
    
    let Model;
    switch(userType) {
      case 'customer': Model = Customer; break;
      case 'admin': Model = Admin; break;
      case 'restaurant': Model = RestaurantAdmin; break;
      case 'delivery': Model = DeliveryPersonnel; break;
      default: return res.status(400).json({ message: 'Invalid user type' });
    }
    
    const user = await Model.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update fields
    Object.keys(updateData).forEach(key => {
      user[key] = updateData[key];
    });
    
    await user.save();
    
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.status(200).json({ 
      message: 'User updated successfully', 
      user: { ...userResponse, userType }
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userType } = req.query;
    
    let Model;
    switch(userType) {
      case 'customer': Model = Customer; break;
      case 'admin': Model = Admin; break;
      case 'restaurant': Model = RestaurantAdmin; break;
      case 'delivery': Model = DeliveryPersonnel; break;
      default: return res.status(400).json({ message: 'Invalid user type' });
    }
    
    const user = await Model.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

// Get user activity logs (placeholder - implement based on your logging system)
exports.getUserLogs = async (req, res) => {
  try {
    // This is a placeholder. In a real system, you would:
    // 1. Have a separate Logs collection
    // 2. Track login attempts, actions, etc.
    // 3. Query that collection here
    
    const mockLogs = [
      {
        id: '1',
        userId: req.params.id,
        action: 'login',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        ipAddress: '192.168.1.100',
        status: 'success'
      },
      {
        id: '2',
        userId: req.params.id,
        action: 'update_profile',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        ipAddress: '192.168.1.100',
        status: 'success'
      },
      {
        id: '3',
        userId: req.params.id,
        action: 'failed_login',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        ipAddress: '192.168.1.105',
        status: 'failed',
        suspicious: true
      }
    ];
    
    res.status(200).json(mockLogs);
  } catch (error) {
    console.error('Error fetching user logs:', error);
    res.status(500).json({ message: 'Error fetching logs', error: error.message });
  }
};

// Update user permissions (for admins)
exports.updatePermissions = async (req, res) => {
  try {
    const { id } = req.params;
    const { permissions } = req.body;
    
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    
    admin.permissions = permissions;
    await admin.save();
    
    res.status(200).json({ message: 'Permissions updated successfully', admin });
  } catch (error) {
    console.error('Error updating permissions:', error);
    res.status(500).json({ message: 'Error updating permissions', error: error.message });
  }
};
