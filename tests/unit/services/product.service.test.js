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
      sinon.stub(productModel, 'findAllProducts').resolves(allProducts);
  
      const result = await productService.findAllProducts();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allProducts);
    });
  });
  describe('searches for a product by id', function () {
    it('returns an error if the id is not valid', async function () {
    
      const result = await productService.findProductById('a');
     
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('returns an error if the product does not exist', async function () {
 
      sinon.stub(productModel, 'findProductById').resolves(undefined);
     
      const result = await productService.findProductById(999);
      
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
      sinon.restore();
    });
    
    it('returns the correct product if it exists', async function () {
      
      sinon.stub(productModel, 'findProductById').resolves(allProducts[0]);
     
      const result = await productService.findProductById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
      sinon.restore();
    });
  });

  describe('adds a new product', function () {
    it('returns an error if the name is not valid', async function () {
    
      const result = await productService.addProduct(newProductWrongName);
      
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"name" length must be at least 5 characters long');
    });
    it('returns type null and the new added product', async function () {

      sinon.stub(productModel, 'addProduct').resolves(42);
      sinon.stub(productModel, 'findProductById').resolves(newAddedProduct);

      const result = await productService.addProduct('Iron Man Suit');
    
      expect(result.type).to.equal(null);
      expect(result.message).to.equal(newAddedProduct);
      sinon.restore();
    });
  });

  describe('Deletes product', function () {
   
    it('returns error if the id is not found', async function () {
sinon.restore();
      sinon.stub(productService, 'findProductById').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
    
      const result = await productService.deleteProduct(999999);
   
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
      sinon.restore();
    });
    it('returns type null and empty string message', async function () {
      sinon.stub(productService, 'findProductById').resolves({ type: null, message: '' });
      sinon.stub(productModel, 'deleteProduct').resolves(1);
 
      const result = await productService.deleteProduct(1);
   
      expect(result.type).to.equal(null);
      expect(result.message).to.equal('');
      sinon.restore();
    });
    afterEach(function () {
      sinon.restore();
    });
  });
});