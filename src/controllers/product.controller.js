const { productService } = require('../services');
const { mapError } = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { type, message } = await productService.findAllProducts();
 
if (type) { return res.status(mapError(type)).json(message); }
  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
 
  const { type, message } = await productService.findProductById(Number(id));
   console.log('AQUIII', type, message);
  if (type) { return res.status(mapError(type)).json(message); }
  res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productService.addProduct(name);
  console.log(message);
  if (type) return res.status(mapError(type)).json(message);
  return res.status(201).json(message);
};
module.exports = { listProducts, getProductById, createProduct };