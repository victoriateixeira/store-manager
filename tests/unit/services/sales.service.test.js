const chai = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { expect } = chai;
const { salesService } = require('../../../src/services');
const { newSaleReq } = require('../models/mocks/sales.model.mock');
const { newSaleWrongIdMock, newSaleWrongQuantityMock, newAddeSaleMock } = require('./mocks/sales.service.mock');

describe('Unit test for sales service layer', function () {

  describe('adds a new sale', function () {
    it('returns an error if the quantity is not valid', async function () {
      // arrange: Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!

      // act
      const result = await salesService.addNewSale(newSaleWrongQuantityMock);
      
      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('\"quantity\" must be greater than or equal to 1');
    });
    it('returns an error if the productId is not found', async function () {
      // arrange: Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!

      // act
      const result = await salesService.addNewSale(newSaleWrongIdMock);
      
      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
//     it.only('returns type null and the new added sale', async function () {
//       // arrange: Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!
//       sinon.stub(salesModel, 'insertNewSale').resolves(42);
//       sinon.stub(salesModel, 'addNewSale').resolves(1);
//       // act
//       const result = await salesService.addNewSale([{
//     "productId": 1,
//     "quantity": 1
//   }]);
      
//       // assert
//       expect(result.type).to.equal(null);
//       expect(result.message).to.equal({
//   "id": 42,
//   "itemsSold": [
//     {
//       "productId": 1,
//       "quantity": 1
//     },
//   ]
// });
//     });
    afterEach(function () {
      sinon.restore();
    });
  });
   describe('Deletes a new sale', function () {

    it('returns an error if the productId is not found', async function () {
      // arrange: Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!
sinon.stub(salesService, 'findSaleById').resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
      // act
      const result = await salesService.deleteSale(9999);
      
      // assert
      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    });
  
    it('returns type null and empty message', async function () {
      // arrange: Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!
    sinon.stub(salesService, 'findSaleById').resolves({ type: null });
      sinon.stub(salesModel, 'deleteSale').resolves(1);
      // act
      const result = await salesService.deleteSale(1);
      
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.equal('');
    });
    afterEach(function () {
      sinon.restore();
    });
  });
});