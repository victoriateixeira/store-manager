const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;
const productModel = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { products } = require('../mocks/product.model.mock.js');

describe('Unit tests for the product model layer', function () {
  it('Retrieving list of all products', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([products]);
    // Act
    const result = await productModel.findAllProducts();
    // Assert
    expect(result).to.be.deep.equal(products);
  });
  it('Retrieving an specific product from its is', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    // Act
    const result = await passengerModel.findProductById(1);
    // Assert
    expect(result).to.be.deep.equal(products[0]);
  });
  afterEach(function () {
    sinon.restore();
  });
});
