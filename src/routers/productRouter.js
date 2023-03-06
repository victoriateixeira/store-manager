const express = require('express');
const { productController } = require('../controllers');
const { validateNewProductName } = require('../middlewares/validateNewProductName');

const router = express.Router();

router.get('/', productController.listProducts);
router.get('/:id', productController.getProductById);
router.post('/', validateNewProductName, productController.createProduct);
router.put('/:id', validateNewProductName, productController.updateProduct);
module.exports = router;