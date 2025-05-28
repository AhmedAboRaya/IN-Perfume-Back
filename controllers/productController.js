const Product = require("../models/Product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require('../config/cloudinary');

// Helper function for Cloudinary uploads
const uploadToCloudinary = async (fileBuffer, fileName) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'products',
        public_id: fileName.split('.')[0], // Remove extension
        resource_type: 'auto'
      },
      (error, result) => {
        if (error) {
          reject(new ErrorHandler(`Cloudinary upload failed: ${error.message}`, 500));
        } else {
          resolve(result);
        }
      }
    );
    uploadStream.end(fileBuffer);
  });
};

// Create new product
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  if (!req.files?.image) {
    return next(new ErrorHandler('Please upload a product image', 400));
  }

  const file = req.files.image;
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  // Validate file type
  if (!allowedTypes.includes(file.mimetype)) {
    return next(new ErrorHandler("Only JPEG, PNG, or WEBP images are allowed", 400));
  }

  // Validate file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    return next(new ErrorHandler("Image size must be less than 5MB", 400));
  }

  try {
    const result = await uploadToCloudinary(file.data, file.name);
    
    const product = await Product.create({
      ...req.body,
      image: {
        public_id: result.public_id,
        url: result.secure_url
      }
    });

    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    return next(error);
  }
});

// Update product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  if (req.files?.image) {
    const file = req.files.image;
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.mimetype)) {
      return next(new ErrorHandler("Only JPEG, PNG, or WEBP images are allowed", 400));
    }

    if (file.size > 5 * 1024 * 1024) {
      return next(new ErrorHandler("Image size must be less than 5MB", 400));
    }

    try {
      // Delete old image if exists
      if (product.image?.public_id) {
        await cloudinary.uploader.destroy(product.image.public_id);
      }

      // Upload new image
      const result = await uploadToCloudinary(file.data, file.name);
      req.body.image = {
        public_id: result.public_id,
        url: result.secure_url
      };
    } catch (error) {
      return next(error);
    }
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
    product
  });
});

// Delete product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  try {
    // Delete image from Cloudinary if exists
    if (product.image?.public_id) {
      await cloudinary.uploader.destroy(product.image.public_id);
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    return next(new ErrorHandler(`Failed to delete product: ${error.message}`, 500));
  }
});

// Get all products (unfiltered)
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    count: products.length,
    products
  });
});

// Get products grouped by category
exports.getProductsByCategory = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  const productsByCategory = products.reduce((acc, product) => {
    const { category } = product;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  res.status(200).json({
    success: true,
    count: products.length,
    productsByCategory
  });
});

// Get products by category (filtered)
exports.getProductsBySingleCategory = catchAsyncErrors(async (req, res, next) => {
  const { category } = req.params;
  const products = await Product.find({ category });

  if (products.length === 0) {
    return next(new ErrorHandler(`No products found in category: ${category}`, 404));
  }

  res.status(200).json({
    success: true,
    count: products.length,
    products
  });
});