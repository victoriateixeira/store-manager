const { findProductById } = require('../product.service');

const validateProductIdExists = async (sales) => {
  console.log(typeof productId);
  const isId = await sales
    .map(async (sale) => findProductById(sale.productId))
    .every((error) => !error.type);
 
  if (!isId) {
    return {
       type: 'PRODUCT_NOT_FOUND',
    message: 'Product not found',
  
    };
  }
  return { type: null, message: '' };
};

module.exports = { validateProductIdExists };