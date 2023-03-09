const chai = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { expect } = chai;
const { salesService } = require('../../../src/services');
const { newSaleReq } = require('../models/mocks/sales.model.mock');
const { newSaleWrongIdMock, newSaleWrongQuantityMock, newAddeSaleMock } = require('./mocks/sales.service.mock');

describe('Unit test for sales service layer', function () {
  // describe('listing all products', function () {
  //   it('reetrieves list of all products', async function () {
  //     // arrange
  //     sinon.stub(productModel, 'findAllProducts').resolves(allProducts);
      
  //     // act
  //     const result = await passengerService.findAllProducts();

  //     // assert
  //     expect(result.type).to.be.equal(null);
  //     expect(result.message).to.deep.equal(allProducts);
  //   });
  // });
  // describe('searches for a product by id', function () {
  //   it('returns an error if the id is not valid', async function () {
  //     // arrange: Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!

  //     // act
  //     const result = await productService.findProductById('a');
      
  //     // assert
  //     expect(result.type).to.equal('INVALID_VALUE');
  //     expect(result.message).to.equal('"id" must be a number');
  //   });

  //   it('returns an error if the product does not exist', async function () {
  //     // arrange
  //     sinon.stub(productModel, 'findProductById').resolves(undefined);
     
  //     // act
  //     const result = await productService.findProductById(999);
      
  //     // assert
  //     expect(result.type).to.equal('PRODUCT_NOT_FOUND');
  //     expect(result.message).to.equal('Product not found');
  //   });
    
  //   it('returns the correct product if it exists', async function () {
  //     // arrange
  //     sinon.stub(productModel, 'findProductById').resolves(allProducts[0]);
      
  //     // act
  //     const result = await productService.findProductsById(1);

  //     // assert
  //     expect(result.type).to.equal(null);
  //     expect(result.message).to.deep.equal(allProducts[0]);
  //   });
  // });

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
    it('returns type null and the new added sale', async function () {
      // arrange: Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!
    
      sinon.stub(salesModel, 'addNewSale').resolves(newAddeSaleMock);
      // act
      const result = await salesService.addNewSale(newSaleReq);
      
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.equal(newAddeSaleMock);
    });
    afterEach(function () {
      sinon.restore();
    });
  });
   describe.only('Deletes a new sale', function () {

    it('returns an error if the productId is not found', async function () {
      // arrange: Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!
sinon.stub(salesService, 'findSaleById').resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
      // act
      const result = await salesService.deleteSale(9999);
      
      // assert
      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    });
  
    it('returns type null and the new added sale', async function () {
      // arrange: Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!
    sinon.stub(salesService, 'findSaleById').resolves({ type: null });
      sinon.stub(salesModel, 'deleteSale').resolves(1);
      // act
      const result = await salesService.deleteSale(42);
      
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.equal('');
    });
    afterEach(function () {
      sinon.restore();
    });
  });
});