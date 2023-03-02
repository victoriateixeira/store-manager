const express = require('express');
const { salesController } = require('../controllers');
const { validateNewSaleProductId,
  validatenewSaleProductQuantity } = require('../middlewares/validateNewSale');

const router = express.Router();

router
  .post('/', validateNewSaleProductId, validatenewSaleProductQuantity, salesController.addNewSale);

module.exports = router;