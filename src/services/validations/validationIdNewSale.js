const { findProductById } = require('../product.service');

const validateProductIdExists = async (productId) => {
  console.log(typeof productId);
  const error = await findProductById(productId);
 
  if (error) {
    return {
       type: 'PRODUCT_NOT_FOUND',
    message: 'Product not found',
  
    };
  }
  return { type: null, message: '' };
};

module.exports = { validateProductIdExists };