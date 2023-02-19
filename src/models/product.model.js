const connection = require('./connection');
const camelize = require('camelize');

const findAllProducts = () => {
  const [result] = connection.execute (
    'SELECT * FROM products',
  );
  return camelize(result);
};

const findProductById = (productId) => {
  const [[result]] = connection.execute(
    'SELECT * FROM products WHERE id =? ORDER BY id', [productId],
  );
  return camelize(result);
};

module.exports = {findAllProducts, findProductById};

