const { salesModel } = require('../models');
const { validateQuantity,
  validateId } = require('./validations/validationInputs');
// const { validateProductIdExists } = require('./validations/validationIdNewSale');

const addNewSale = async (newSale) => {
  const errorQuantity = validateQuantity(newSale);
  if (errorQuantity.type) { return errorQuantity; }
  // const errorId = validateProductIdExists(newSale);
  // if (errorId.type) { return errorId; }
const newAddedSale = await salesModel.addNewSale(newSale);
  return { type: null, message: newAddedSale };
};

const listAllSales = async () => {
  const salesList = await salesModel.listAllSales();
  return { type: null, message: salesList };
};

const findSaleById = async (saleId) => {
  const error = validateId(saleId);
  if (error.type) { return error; }
  const sale = await salesModel.getSaleById(saleId);
  if (sale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: sale };
};

module.exports = { addNewSale, findSaleById, listAllSales };