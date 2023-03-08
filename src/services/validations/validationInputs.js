// const { productService } = require('..');

const { idSchema, nameSchema, quantitySchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  console.log(error);
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

const validateQuantity = (sales) => {
  const isQuantity = sales
    .map((sale) => { 
    const { error } = quantitySchema.validate(sale.quantity);
    return error;
    })
    .every((error) => !error);
  // const { error } = quantitySchema.validate(quantity);
  console.log(isQuantity);
  if (!isQuantity) {
    return {
       type: 'INVALID_VALUE',
    message: '"quantity" must be greater than or equal to 1',
  
    };
  }
  return { type: null, message: '' };
};

module.exports = { validateId, validateName, validateQuantity };