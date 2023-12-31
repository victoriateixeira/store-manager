const { salesService } = require('../services');
const { mapError } = require('../utils/errorMap');

const addNewSale = async (req, res) => {
  const sales = req.body;
  const { type, message } = await salesService.addNewSale(sales);
  if (type) { return res.status(mapError(type)).json({ message }); }
  return res.status(201).json(message);
};

const listAllSales = async (_req, res) => {
  const { type, message } = await salesService.listAllSales();
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findSaleById(id);
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(200).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteSale(Number(id));
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(204).json();
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const updatedSale = req.body;
  const { type, message } = await salesService.updateSale(Number(id), updatedSale);
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(200).json(message);
};

module.exports = { addNewSale, listAllSales, getSaleById, deleteSale, updateSale };