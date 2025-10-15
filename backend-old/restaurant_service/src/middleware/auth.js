import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  // Check for token in x-auth-token header OR Authorization Bearer header
  let token = req.header('x-auth-token');
  
  if (!token) {
    const authHeader = req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7); // Remove 'Bearer ' prefix
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Support both old format (req.restaurant) and new format (req.user.restaurantId)
    req.restaurant = decoded.restaurantId || decoded.id;
    req.user = {
      restaurantId: decoded.restaurantId || decoded.id,
      email: decoded.email,
      role: decoded.role
    };
    
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default auth;
