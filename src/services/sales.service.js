const { salesModel } = require('../models');
const { validationInputs } = require('./validations/validationInputs');

const addNewSale = async (newSale) => {
  newSale.forEach((product) => {
    let error = validationInputs.validateQuantity(product.quantity);
    if (error.type) { return error; }
    error = validationInputs.validateProductIdExists(product.productId);
    if (error.type) { return error; }
  });
  const newAddedSale = await salesModel.addNewSale(newSale);
  return { type: null, message: newAddedSale };
};

const listAllSales = async () => {
  const salesList = await salesModel.listAllSales();
  return { type: null, message: salesList };
};

const FindSaleById = async (saleId) => {
  const error = validationInputs.validateId(saleId);
  if (error.type) { return error; }
  const sale = await salesModel.getSaleById(saleId);
  if (!sale) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: sale };
};

module.exports = { addNewSale, FindSaleById, listAllSales };