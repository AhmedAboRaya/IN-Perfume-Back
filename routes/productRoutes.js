const express = require('express');
const {
  newProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductsByCategory,
  getProductsBySingleCategory,
} = require('../controllers/productController');
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router();

router.route('/products').get(getAllProducts);
router.route('/products/categories').get(getProductsByCategory);
router.route('/products/category/:category')
  .get(getProductsBySingleCategory);
router.route('/admin/product/new').post(isAuthenticatedUser, newProduct);
router
  .route('/admin/product/:id')
  .put(isAuthenticatedUser, updateProduct)
  .delete(isAuthenticatedUser, deleteProduct);

module.exports = router;