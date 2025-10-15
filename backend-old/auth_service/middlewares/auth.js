// backend/auth-service/middlewares/auth.js
const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");
const Admin = require("../models/Admin");
const RestaurantAdmin = require("../models/RestaurantAdmin");
const DeliveryPersonnel = require("../models/DeliveryPersonnel");

// Middleware to protect routes
exports.protect = async (req, res, next) => {
  try {
    // 1) Check for Bearer token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res
        .status(401)
        .json({ message: "You are not logged in. Please log in first." });
    }

    // 2) Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) For superAdmin, we trust the token without checking database
    //    (since SuperAdmin is managed in restaurant-service)
    if (decoded.role === 'superAdmin' || decoded.role === 'super-admin') {
      req.user = { _id: decoded.id, role: decoded.role, name: decoded.name };
      req.userId = decoded.id;
      req.userRole = decoded.role;
      return next();
    }

    // 4) For other users, check that the user still exists in database
    let user;
    switch(decoded.role) {
      case 'customer':
        user = await Customer.findById(decoded.id);
        break;
      case 'admin':
        user = await Admin.findById(decoded.id);
        break;
      case 'restaurant':
        user = await RestaurantAdmin.findById(decoded.id);
        break;
      case 'delivery':
        user = await DeliveryPersonnel.findById(decoded.id);
        break;
      default:
        user = await Customer.findById(decoded.id);
    }
    
    if (!user) {
      return res
        .status(401)
        .json({ message: "The user belonging to this token no longer exists." });
    }

    // 5) Grant access
    req.user = user;
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Token is invalid or expired." });
  }
};
