const chai = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { expect } = chai;
const connection = require('../../../src/models/connection');
const { newAddeSaleMock, newSaleReq, allSales, saleById } = require('./mocks/sales.model.mock');



describe('Unit tests for the sales model layer', function () {

  it('should add a new sale to the products table', async function () {
  sinon.stub(connection, 'execute').resolves([{affectedRows: 1}]);

    const result = await salesModel.addNewSale(newSaleReq, 42);

    expect(result).to.equal(1);
  });
  it('should add a new sale to the sales table', async function () {
  sinon.stub(connection, 'execute').resolves([{insertId: 42}]);

    const result = await salesModel.insertNewSale();

    expect(result).to.equal(42);
  });
  it('should delete a sale from the database', async function () {
    sinon.stub(connection, 'execute').resolves([{affectedRows: 1}]);

    const result = await salesModel.deleteSale(42);

    expect(result).to.equal(1);
  });
  afterEach(function () {
    sinon.restore();
  });
   it('should find all sales', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]);

    const result = await salesModel.listAllSales();

    expect(result).to.equal(allSales);
  });
   it('should find a sale by its id', async function () {
    sinon.stub(connection, 'execute').resolves([saleById]);

    const result = await salesModel.getSaleById(1);

    expect(result).to.equal(saleById);
  });
   it('should update a sale', async function () {
    sinon.stub(connection, 'execute').resolves([{affectedRows: 1}]);

    const result = await salesModel.updateSale(1, [
    {
      "productId": 1,
      "quantity": 1
    }
  ]);

    expect(result).to.equal(1);
  });
   it('should not update a sale that does not exist', async function () {
    sinon.stub(connection, 'execute').resolves([{affectedRows: 0}]);

    const result = await salesModel.updateSale(9999, [
    {
      "productId": 1,
      "quantity": 1
    }
  ]);

    expect(result).to.equal(0);
  });
   it('should not delete a sale that does not exist', async function () {
    sinon.stub(connection, 'execute').resolves([{affectedRows: 0}]);

    const result = await salesModel.deleteSale(9999);

    expect(result).to.equal(0);
  });
  afterEach(function () {
    sinon.restore();
  });
});
