require('dotenv').config();
const express = require('express');
const cors = require('cors');  
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const userManagementRoutes = require('./routes/userManagementRoutes');
const deliveryManagementRoutes = require('./routes/deliveryManagementRoutes');

const app = express();
app.use(cors({ 
  origin: ["http://localhost:3000", "http://localhost:3001"], 
  credentials: true 
}));
app.use(express.json());

// Connect DB then start
connectDB().then(() => {
  app.use('/api/auth', authRoutes);
  app.use('/api/management', userManagementRoutes);
  app.use('/api/management', deliveryManagementRoutes);

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Auth Service running on port ${PORT}`);
  });
});
