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

const updateProduct = async (productId, newName) => {
  const errorName = validateName(newName);
  console.log(errorName, 'PRODUCTSERVICE_UPDATEPRODUCT');
  if (errorName.type) return errorName;

 await productModel.updateProduct(productId, newName);

    const updatedProduct = await findProductById(productId);
    console.log(updateProduct, 'PRODUCTSERVICE_UPDATEPRODUCT');
    return { type: updatedProduct.type, message: updatedProduct.message };
};

const deleteProduct = async (productId) => {
  const product = await findProductById(productId);
  if (product.type) { return product; }
  await productModel.deleteProduct(productId);
  return { type: null, message: '' };
};

const searchesProduct = async (name) => {
  // if (!name) {
  //   const allProducts = await productModel.findAllProducts;
  //   return { type: null, message: allProducts };
  // }
  const allProducts = await productModel.findAllProducts();
  const searchedProducts = allProducts.filter((product) => product.name.includes(name));
  return { type: null, message: searchedProducts };
};
module.exports = {
  findAllProducts,
  findProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  searchesProduct,
};