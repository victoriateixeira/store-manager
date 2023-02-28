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

module.exports = { addNewSale };