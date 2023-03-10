const validateNewSaleProductId = (req, res, next) => {
  const newSale = req.body;
  const isId = newSale.some((product) => (!product.productId || product.productId <= 0));
  console.log(isId);
if (isId) { return res.status(400).json({ message: '"productId" is required' }); }
  // newSale.forEach((product) => {
  //   if (!product.productId || product.productId <= 0) {
  //     return res.status(400).json({ message: '"productId" is required' });
  //   }
  // });
  // console.log(newSale[0].productId, 'VALIDATENEWSALE');
  
  return next();
};

const validateNewSaleProductQuantity = (req, res, next) => {
  const newSale = req.body;
  const isQuantity = newSale.some((product) => (!product.quantity && product.quantity !== 0));
if (isQuantity) { return res.status(400).json({ message: '"quantity" is required' }); }
  // newSale.forEach((product) => {
  //   if (!product.quantity && product.quantity !== 0) {
  //     return res.status(400).json({ message: '"quantity" is required' });
  //   }
  //   });
  // console.log(newSale[0].quantity, 'VALIDATENEWSALE');
  
  return next();
};

module.exports = { validateNewSaleProductId, validateNewSaleProductQuantity };