const express = require('express');
const { salesController } = require('../controllers');
const { validateNewSaleProductId,
  validatenewSaleProductQuantity } = require('../middlewares/validateNewSale');

const router = express.Router();

router
  .post('/', validateNewSaleProductId, validatenewSaleProductQuantity, salesController.addNewSale);
router.get('/', salesController.listAllSales);
router.get('/:id', salesController.getSaleById);
router.delete('/:id', salesController.deleteSale);
  
module.exports = router;