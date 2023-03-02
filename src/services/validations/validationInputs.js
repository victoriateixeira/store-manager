const { productService } = require('..');
const { idSchema, nameSchema, quantitySchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };
  
  return { type: null, message: '' };
};

const validateName = (name) => {
  const { error } = nameSchema.validate(name);
  if (error) {
 return {
    type: 'INVALID_VALUE',
    message: '"name" length must be at least 5 characters long',
  }; 
}
  return { type: null, message: '' };
};

const validateQuantity = (quantity) => {
  const { error } = quantitySchema.validate(quantity);
  if (error) {
    return {
       type: 'INVALID_VALUE',
    message: '"quantity" must be greater than or equal to 1',
  
    };
  }
  return { type: null, message: '' };
};

const validateProductIdExists = async (productId) => {
  const error = await productService.findProductById(productId);
  if (error) {
    return {
       type: 'PRODUCT_NOT_FOUND',
    message: 'Product not found',
  
    };
  }
  return { type: null, message: '' };
};

module.exports = { validateId, validateName, validateQuantity, validateProductIdExists };