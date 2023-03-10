const { findProductById } = require('../product.service');

const validateProductIdExists = async (sales) => {
  const verifyId = await Promise.all(sales
    .map((sale) => findProductById(sale.productId)));
   const isId = verifyId.every((error) => !error.type);
  console.log(isId, 'VALIDATIONIDNEWSALE');
  if (!isId) {
    return {
      type: 'PRODUCT_NOT_FOUND',
      message: 'Product not found',
  
    };
  }
  return { type: null, message: '' };
};

module.exports = { validateProductIdExists };