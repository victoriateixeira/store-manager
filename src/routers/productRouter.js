const express = require('express');
const { productController } = require('../controllers');
const { validateNewProductName } = require('../middlewares/validateNewProductName');

const router = express.Router();

router.get('/search', productController.searchesProduct);
router.get('/', productController.listProducts);
router.get('/:id', productController.getProductById);
router.post('/', validateNewProductName, productController.createProduct);
router.put('/:id', validateNewProductName, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;