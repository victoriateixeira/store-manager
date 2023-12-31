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
  if (type) { return res.status(mapError(type)).json({ message }); }
  res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productService.addProduct(name);
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
    const { type, message } = await productService.updateProduct(id, name);
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.deleteProduct(Number(id));
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(204).json();
};

const searchesProduct = async (req, res) => {
  const { q } = req.query;
  if (!q) {
    const { message } = await productService.findAllProducts();
    return res.status(200).json(message);
  }
  const { message } = await productService.searchesProduct(q);
  return res.status(200).json(message);
};
module.exports = {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchesProduct,
};