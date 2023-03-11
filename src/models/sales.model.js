const connection = require('./connection');

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

const insertNewSale = async () => {
  const [{ insertId }] = await connection.execute(
      'INSERT INTO StoreManager.sales (date) VALUES(?)', [new Date()],
  );
  return insertId;
};

const addNewSale = async (item, insertId) => {
  const [{ affectedRows }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
     [insertId, item.productId, item.quantity],
  );
  return affectedRows;
};

const deleteSale = async (saleId) => {
  const [{ affectedRows }] = await connection.execute(
    `DELETE FROM StoreManager.sales
    WHERE id = ?`, [saleId],
  );
  return affectedRows;
};

const updateSale = async (saleId, item) => {
  const [{ affectedRows }] = await connection.execute(
    `UPDATE StoreManager.sales_products 
     SET  quantity = ?
     WHERE sale_id=? AND product_id=?`,
    [item.quantity, saleId, item.productId],
  );
 
  return affectedRows;
  // await deleteSale(saleId);
  // await addNewSale(updatedSale);
  // const changedSale = {
  //   id: saleId,
  //   itemsUpdated: updatedSale,
  // };
  // return changedSale;
};

module.exports = { addNewSale, listAllSales, getSaleById, deleteSale, updateSale, insertNewSale };