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

module.exports = { addNewSale };