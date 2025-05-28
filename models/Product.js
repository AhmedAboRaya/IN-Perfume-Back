const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters'],
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
    maxlength: [8, 'Price cannot exceed 8 characters'],
    default: 0.0,
  },
  size: {
    type: Number,
    required: [true, 'Please provide product size'],
  },
  category: {
    type: String,
    required: [true, 'Please provide product category'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);