const connection = require('./connection');

const addNewSale = async (newSale) => {
  // const itemsSold = [];

    const [{ insertId }] = await connection.execute(
      'INSERT INTO StoreManager.sales (date) VALUES(?)', [new Date()],
    );
  newSale.forEach(async (item) => {
await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [insertId, item.productId, item.quantity],
    );
  });
  const sale = {
  id: insertId,
  itemsSold: newSale,
  };
  return sale;
};

const listAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT sale_id AS saleId, date, product_id AS productId, quantity 
    FROM StoreManager.sales_products AS sp 
    INNER JOIN StoreManager.sales AS s 
    ON sp.sale_id = s.id ORDER BY saleId, productId`,
  );
  return (result);
};

const getSaleById = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT date, product_id AS productId, quantity 
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id
    WHERE s.id =? `, [saleId],
  );
  return (result);
};

module.exports = { addNewSale, listAllSales, getSaleById };