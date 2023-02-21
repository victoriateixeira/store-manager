const { productModel } = require('../models');
const { validationInputs } = require('./validations/validationInputs');

const findAllProducts = async () => {
const products = await productModel.findAllProducts();
return { type: null, message: products };
};

const findProductById = async (productId) => {
  const error = validationInputs.validateId(productId);
  if (error.type) { return error; }

  const product = await productModel.findProductById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

module.exports = { findAllProducts, findProductById };