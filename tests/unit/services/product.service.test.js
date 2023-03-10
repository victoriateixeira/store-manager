const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productModel } = require('../../../src/models');
const { expect } = chai;
const { productService } = require('../../../src/services');
const {allProducts, newProductWrongName, newAddedProduct} = require('./mocks/product.service.mock')

describe('Unit test for product service layer', function () {
  describe('listing all products', function () {
    it('reetrieves list of all products', async function () {
      // arrange
      sinon.stub(productModel, 'findAllProducts').resolves(allProducts);
      
      // act
      const result = await productService.findAllProducts();

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allProducts);
    });
  });
  describe('searches for a product by id', function () {
    it('returns an error if the id is not valid', async function () {
      // arrange: Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!

      // act
      const result = await productService.findProductById('a');
      
      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('returns an error if the product does not exist', async function () {
      // arrange
      sinon.stub(productModel, 'findProductById').resolves(undefined);
     
      // act
      const result = await productService.findProductById(999);
      
      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
      sinon.restore();
    });
    
    it('returns the correct product if it exists', async function () {
      // arrange
      sinon.stub(productModel, 'findProductById').resolves(allProducts[0]);
      
      // act
      const result = await productService.findProductById(1);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
      sinon.restore();
    });
  });

  describe('adds a new product', function () {
    it('returns an error if the name is not valid', async function () {
      // arrange: Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!

      // act
      const result = await productService.addProduct(newProductWrongName);
      
      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"name" length must be at least 5 characters long');
    });
    it('returns type null and the new added product', async function () {
      // arrange: Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!
      sinon.stub(productModel, 'addProduct').resolves(42);
      sinon.stub(productModel, 'findProductById').resolves(newAddedProduct);
      // act
      const result = await productService.addProduct('Iron Man Suit');
      
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.equal(newAddedProduct);
      sinon.restore();
    });
  });
  // describe('updates product', function () {
    // it('returns an error if the name is not valid', async function () {
    //   // arrange: Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!

    //   // act
    //   const result = await productService.updateProduct(newProductWrongName);
      
    //   // assert
    //   expect(result.type).to.equal('INVALID_VALUE');
    //   expect(result.message).to.equal('"name" length must be at least 5 characters long');
    //   sinon.restore();
    // });
    // it('returns error if the id is not found', async function () {
    //   sinon.stub(productService, 'findProductById').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
    //   // sinon.stub(productModel, 'updateProduct').resolves(0);
    //   // act
    //   const result = await productService.updateProduct(999999,'Iron Man Suit');
      
    //   // assert
    //   expect(result.type).to.equal('PRODUCT_NOT_FOUND');
    //   expect(result.message).to.equal('Product not found');
    //   sinon.restore();
    // });
    // it('returns type null and the new updated product', async function () {
    //   sinon.restore();
    //   sinon.stub(productModel, 'updateProduct').resolves(1);
    //   sinon.stub(productService, 'findProductById').resolves({type: null, message: {"id": 1, "name": 'Iron Man Suit'}});
    //   // act
    //   const result = await productService.updateProduct(1,'Iron Man Suit');
      
    //   // assert
    //   expect(result.type).to.equal(null);
    //   expect(result.message).to.equal({"id": 1, "name": 'Iron Man Suit'});
    //   sinon.restore();
    // });
  // });

  describe('Deletes product', function () {
   
    it('returns error if the id is not found', async function () {
sinon.restore();
      sinon.stub(productService, 'findProductById').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      // sinon.stub(productModel, 'deleteProduct').resolves(0);
      // act
      const result = await productService.deleteProduct(999999);
      
      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
      sinon.restore();
    });
    it('returns type null and empty string message', async function () {
      sinon.stub(productService, 'findProductById').resolves({ type: null, message: '' });
      sinon.stub(productModel, 'deleteProduct').resolves(1);
      // act
      const result = await productService.deleteProduct(1);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.equal('');
      sinon.restore();
    });
    afterEach(function () {
      sinon.restore();
    });
  });
});