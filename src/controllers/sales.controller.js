const salesService = require('../services');
const errorMap = require('../utils/errorMap');

const addNewSale = async (req, res) => {
  const sales = req.body;
  const { type, message } = await salesService.addNewSale(sales);
  if (type) return res.status(errorMap.mapError(type)).json(message);
  return res.status(201).json(message);
};

const listAllSales = async (req, res) => {
  const { type, message } = await salesService.listAllSales();
  if (type) return res.status(errorMap.mapError(type)).json(message);
  return res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { productId } = req.params;
  const { type, message } = await salesService.getSaleById(productId);
  if (type) return res.status(errorMap.mapError(type)).json(message);
  return res.status(200).json(message);
};

module.exports = { addNewSale, listAllSales, getSaleById };