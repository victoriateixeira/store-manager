const camelize = require('camelize');
const connection = require('./connection');

const addNewSale = (newSale) => {
  const itemsSold = [];

    const [{ insertId }] = connection.execute(
      'INSERT INTO StoreManager.sales DEFAULT VALUES',
    );
  newSale.forEach((item) => {
    const [result] = connection.execute(
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

const listAllSales = () => {
  const [result] = connection.execute(
    'SELECT * FROM StoreManager.sales ORDER BY sale_id, product_id',
  );
  return camelize(result);
};

const getSaleById = (saleId) => {
  const [[result]] = connection.execute(
    'SELECT * FROM StoreManager.sales WHERE sale_id=?', [saleId],
  );
  return camelize(result);
};

module.exports = { addNewSale, listAllSales, getSaleById };