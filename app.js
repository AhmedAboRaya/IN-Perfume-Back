const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const errorMiddleware = require('./middleware/error');
const path = require('path');

// Route files
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Cors middleware
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: false, // Disable credentials if not needed
  })
);

// File upload middleware
app.use(fileUpload({
  useTempFiles: false,
  limits: { fileSize: 5 * 1024 * 1024 },
  abortOnLimit: true
}));

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/v1', authRoutes);
app.use('/api/v1', productRoutes);

// Error middleware
app.use(errorMiddleware);

module.exports = app;