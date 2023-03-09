const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;
const {productModel} = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { products, newProductModel } = require('./mocks/product.model.mock');

describe('Unit tests for the product model layer', function () {
  it('Retrieving list of all products', async function () {
    sinon.stub(connection, 'execute').resolves([products]);

    const result = await productModel.findAllProducts();

    expect(result).to.be.deep.equal(products);
  });
  it('Retrieving an specific product from its id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[[products[0]]]]);
    // Act
    const result = await productModel.findProductById(1);
    // Assert
    expect(result).to.be.deep.equal([products[0]]);
  });
  it('should add a new product to the database', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);

    const result = await productModel.addProduct(newProductModel);

    expect(result).to.equal(42);
  });
  it('should update a product in the database', async function () {
    sinon.stub(connection, 'execute').resolves([{ changedRows: 1 }]);

    const result = await productModel.updateProduct(newProductModel);

    expect(result).to.equal(1);
  });
  it('should delete a product from the database', async function () {
    const id = 42;
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const result = await productModel.deleteProduct(id);

    expect(result).to.equal(1);
  });
  afterEach(function () {
    sinon.restore();
  });
});
