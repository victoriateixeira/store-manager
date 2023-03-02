const camelize = require('camelize');
const connection = require('./connection');

const addNewSale = async (newSale) => {
  const itemsSold = [];

    const [{ insertId }] = await connection.execute(
      'INSERT INTO StoreManager.sales DEFAULT VALUES',
    );
  newSale.forEach(async (item) => {
    const [result] = await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [insertId, item.productId, item.quantity],
    );
    itemsSold.push(result);
  });
  const sale = {
  id: insertId,
  itemsSold,
  };
  return sale;
};

const listAllSales = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales ORDER BY sale_id, product_id',
  );
  return camelize(result);
};

const getSaleById = async (saleId) => {
  const [[result]] = await connection.execute(
    'SELECT date, product_id, quantity FROM StoreManager.sales WHERE sale_id=?', [saleId],
  );
  return camelize(result);
};

module.exports = { addNewSale, listAllSales, getSaleById };