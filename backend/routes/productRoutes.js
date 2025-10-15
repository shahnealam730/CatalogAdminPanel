const express = require('express');
const router = express.Router();
const { getProducts, getProductById, addProduct } = require('../controllers/productController');
const auth = require('../middleware/auth');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', auth, addProduct);

module.exports = router;
