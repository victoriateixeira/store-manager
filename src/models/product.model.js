const camelize = require('camelize');
const connection = require('./connection');

const findAllProducts = () => {
  const [result] = connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id',
  );
  return camelize(result);
};

const findProductById = (productId) => {
  const [[result]] = connection.execute(
    'SELECT date, product_id, quantity FROM StoreManager.products WHERE id=?', [productId],
  );
  return camelize(result);
};

const addProduct = (name) => {
  const [{ insertId }] = connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)', [name],
  );
  return insertId;
};
module.exports = { findAllProducts, findProductById, addProduct };
