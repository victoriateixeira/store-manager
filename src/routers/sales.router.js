const express = require('express');
const { salesController } = require('../controllers');
const { validateNewSaleProductId,
  validateNewSaleProductQuantity } = require('../middlewares/validateNewSale');

const router = express.Router();

router
  .post('/', validateNewSaleProductId, validateNewSaleProductQuantity, salesController.addNewSale);
router.get('/', salesController.listAllSales);
router.get('/:id', salesController.getSaleById);
router.delete('/:id', salesController.deleteSale);
router
.put('/:id', validateNewSaleProductId, validateNewSaleProductQuantity, salesController.updateSale);
module.exports = router;