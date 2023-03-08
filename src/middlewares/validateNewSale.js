const validateNewSaleProductId = (req, res, next) => {
  const newSale = req.body;
  newSale.forEach((product) => {
    if (!product.productId) return res.status(400).json({ message: '"productId" is required' });
  });
  console.log(newSale[0].productId, 'VALIDATENEWSALE');
  
  return next();
};

const validatenewSaleProductQuantity = (req, res, next) => {
const newSale = req.body;
  newSale.forEach((product) => {
    if (!product.quantity) return res.status(400).json({ message: '"quantity" is required' });
  });
  console.log(newSale[0].quantity, 'VALIDATENEWSALE');
  
  return next();
};

module.exports = { validateNewSaleProductId, validatenewSaleProductQuantity };