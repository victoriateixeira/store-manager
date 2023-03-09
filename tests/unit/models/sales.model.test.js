const chai = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { expect } = chai;
const connection = require('../../../src/models/connection');
const { newAddeSaleMock, newSaleReq } = require('./mocks/sales.model.mock');



describe('Unit tests for the sales model layer', function () {

  it('should add a new sale to the database', async function () {
    sinon.stub(connection, 'execute').resolves(newAddeSaleMock);

    const result = await salesModel.addNewSale(newSaleReq);

    expect(result).to.equal(newAddeSaleMock);
  });
  it('should delete a sale from the database', async function () {
    sinon.stub(connection, 'execute').resolves([{affectedRows: 1}]);

    const result = await salesModel.deleteSale(42);

    expect(result).to.equal(1);
  });
  afterEach(function () {
    sinon.restore();
  });
});
