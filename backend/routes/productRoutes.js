// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// @route   POST /api/products
router.post('/', createProduct);

// @route   GET /api/products
router.get('/', getProducts);

// @route   GET /api/products/:id
router.get('/:id', getProductById);

// @route   PUT /api/products/:id
router.put('/:id', updateProduct);

// @route   DELETE /api/products/:id
router.delete('/:id', deleteProduct);

module.exports = router;
