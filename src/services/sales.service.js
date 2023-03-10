const { salesModel } = require('../models');
const validationInputs = require('./validations/validationInputs');
// const { validateQuantity,
//   validateId } = require('./validations/validationInputs');
const validationIdNewSale = require('./validations/validationIdNewSale');

const addNewSale = async (newSale) => {
  const errorQuantity = validationInputs.validateQuantity(newSale);
  if (errorQuantity.type) { return errorQuantity; }

  const errorId = await validationIdNewSale.validateProductIdExists(newSale);
  console.log(errorId, 'SALESSERVICE_ADDNEWSALE');
  if (errorId.type) { return errorId; }
const newAddedSale = await salesModel.addNewSale(newSale);
  return { type: null, message: newAddedSale };
};

const listAllSales = async () => {
  const salesList = await salesModel.listAllSales();
  return { type: null, message: salesList };
};

const findSaleById = async (saleId) => {
  const error = validationInputs.validateId(saleId);
  if (error.type) { return error; }
  const sale = await salesModel.getSaleById(saleId);
  if (sale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: sale };
};

const deleteSale = async (saleId) => {
  const isSale = await findSaleById(saleId);
  console.log(isSale, 'SALESSERVICE/DELETESALE');

  if (isSale.type) { return isSale; }
  await salesModel.deleteSale(saleId);
  return { type: null, message: '' };
};

const updateSale = async (saleId, updatedSale) => {
   const isSale = await findSaleById(saleId);
  if (isSale.type) { return isSale; }
  const errorQuantity = validationInputs.validateQuantity(updatedSale);
  if (errorQuantity.type) { return errorQuantity; }
  const errorId = validationIdNewSale.validateProductIdExists(updatedSale);
  if (errorId.type) { return errorId; }
  const changedSale = await salesModel.updateSale(saleId, updatedSale);
  return { type: null, message: changedSale };
};
module.exports = { addNewSale, findSaleById, listAllSales, deleteSale, updateSale };