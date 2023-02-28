const validateNewSaleProductId = (req, res, next) => {
  const { productId } = req.body;
  if (!productId) return res.status(400).json({ message: '"productId" is required' });
  return next();
};

const validatenewSaleProductQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (!quantity) return res.status(400).json({ message: '"quantity" is required' });
  return next();
};

module.exports = { validateNewSaleProductId, validatenewSaleProductQuantity };