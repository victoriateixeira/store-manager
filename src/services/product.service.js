const { productModel } = require('../models');
const { validateId, validateName } = require('./validations/validationInputs');

const findAllProducts = async () => {
  const products = await productModel.findAllProducts();

return { type: null, message: products };
};

const findProductById = async (productId) => {
  const error = validateId(productId);
  console.log(error);
  if (error.type) { return error; }

  const product = await productModel.findProductById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const addProduct = async (name) => {
  const error = validateName(name);
  console.log(error);
  if (error.type) return error;

  const newProductId = await productModel.addProduct(name);
  const newProduct = await productModel.findProductById(newProductId);

  return { type: null, message: newProduct };
};

module.exports = { findAllProducts, findProductById, addProduct };