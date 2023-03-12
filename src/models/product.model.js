const camelize = require('camelize');
const connection = require('./connection');

const findAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id',
    );
  return camelize(result);
};

const findProductById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id=?', [productId],
  );
  return camelize(result);
};

const addProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)', [name],
  );
  return insertId;
};

const updateProduct = async (productId, newName) => {
  const [{ changedRows }] = await connection.execute(
    `UPDATE StoreManager.products
    SET name = ?
    WHERE id = ? `, [newName, productId],
  );
  console.log(changedRows, 'PRODUCTMODEL_UPDATEPRODUCT');
  return changedRows;
};

const deleteProduct = async (productId) => {
  console.log(productId);
  const [{ affectedRows }] = await connection.execute(
    `DELETE FROM StoreManager.products
    WHERE id = ?
    `, [productId],
  );
  return affectedRows;
};

// const searchesProduct = async (name) => {
//   const result = await connection.execute(
//     `SELECT name FROM StoreManager.products
//     WHERE name LIKE '%?%' `, [name],
//   );
//   console.log(result, 'SEARCHPROD');
//   return result;
// };

module.exports = {
  findAllProducts,
  findProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
