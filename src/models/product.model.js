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
    'SELECT * FROM StoreManager.products WHERE id =?', [productId],
  );
  return camelize(result);
};

module.exports = { findAllProducts, findProductById };
