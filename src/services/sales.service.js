const { salesModel } = require('../models');
const validationInputs = require('./validations/validationInputs');
// const { validateQuantity,
//   validateId } = require('./validations/validationInputs');
// const validationIdNewSale = require('./validations/validationIdNewSale');
const { validateProductIdExists } = require('./validations/validationIdNewSale');

const addNewSale = async (newSale) => {
  const errorQuantity = validationInputs.validateQuantity(newSale);
  if (errorQuantity.type) { return errorQuantity; }

  const errorId = await validateProductIdExists(newSale);
  console.log(errorId, 'SALESSERVICE_ADDNEWSALE');
  if (errorId.type) { return errorId; }
  const insertId = await salesModel.insertNewSale(newSale);
  newSale.forEach(async (item) => {
    await salesModel.addNewSale(item, insertId);
  });
const newAddedSale = {
  id: insertId,
  itemsSold: newSale,
  };
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
  console.log(sale, 'SALESSERVICE_FINDSALEBYID');
  if (sale.length === 0) { return { type: 'SALE_NOT_FOUND', message: 'Sale not found' }; }
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
  console.log(isSale, 'SALESSERVICE_UPDDATESALE');
  if (isSale.type) { return isSale; }
  const errorQuantity = validationInputs.validateQuantity(updatedSale);
  if (errorQuantity.type) { return errorQuantity; }
  // const errorId = validationIdNewSale.validateProductIdExists(updatedSale);
  const errorId = await validateProductIdExists(updatedSale);
  console.log(errorId, 'SALESSERVICE_ERRORID');
  if (errorId.type) { return errorId; }
  const changedSale = await salesModel.updateSale(saleId, updatedSale);
  return { type: null, message: changedSale };
};
module.exports = { addNewSale, findSaleById, listAllSales, deleteSale, updateSale };