const chai = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { expect } = chai;
const { salesService } = require('../../../src/services');
const { newSaleReq, allSales, saleById, newAddeSaleMock } = require('../models/mocks/sales.model.mock');
const { newSaleWrongIdMock, newSaleWrongQuantityMock} = require('./mocks/sales.service.mock');

describe('Unit test for sales service layer', function () {

  describe('adds a new sale', function () {
    it('returns an error if the quantity is not valid', async function () {
 
      const result = await salesService.addNewSale(newSaleWrongQuantityMock);
      
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('\"quantity\" must be greater than or equal to 1');
    });
    it('returns an error if the productId is not found', async function () {
    
      const result = await salesService.addNewSale(newSaleWrongIdMock);
      
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
    it('returns type null and the new added sale', async function () {
      
      sinon.stub(salesModel, 'insertNewSale').resolves(42);
      sinon.stub(salesModel, 'addNewSale').resolves(1);
  
      const result = await salesService.addNewSale([{
    "productId": 1,
    "quantity": 1
  }]);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(newAddeSaleMock);
    });
    afterEach(function () {
      sinon.restore();
    });
  });
   describe('Deletes a new sale', function () {

    it('returns an error if the productId is not found', async function () {
 
sinon.stub(salesService, 'findSaleById').resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
 
      const result = await salesService.deleteSale(9999);
      
      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    });
  
    //  it('returns type null and empty message', async function () {
    //    sinon.restore();
 
    // sinon.stub(salesService, 'findSaleById').resolves({ type: null });
    //   sinon.stub(salesModel, 'deleteSale').resolves(1);

    //   const result = await salesService.deleteSale(1);
 
    //   expect(result.type).to.equal(null);
    //   expect(result.message).to.equal('');
    // });
    
   });
  describe('Finds sales', function () {

    it('returns all sales and type null', async function () {
    
      sinon.stub(salesModel, 'listAllSales').resolves( allSales );

      const result = await salesService.listAllSales();
      
      expect(result.type).to.equal(null);
      expect(result.message).to.equal(allSales);
    });
    it('returns sale by id', async function () {
      
      sinon.stub(salesModel, 'getSaleById').resolves( saleById );

      const result = await salesService.findSaleById(1);
      
      expect(result.type).to.equal(null);
      expect(result.message).to.equal(saleById);
    });
    afterEach(function () {
      sinon.restore();
    });
  });
});