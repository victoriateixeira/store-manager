const salesService = require('../services');
const errorMap = require('../utils/errorMap');

const addNewSale = async (req, res) => {
  const sales = req.body;
  const { type, message } = await salesService.addNewSale(sales);
  if (type) return res.status(errorMap.mapError(type)).json(message);
  return res.status(201).json(message);
};

module.exports = { addNewSale };