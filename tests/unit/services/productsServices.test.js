const chai = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { expect } = chai;
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models')
const {allProducts, newProductWrongName, newAddedProduct} = require('./mocks/product.service.mock')

describe('Unit test for product service layer', function () {
  describe('listing all products', function () {
    it('reetrieves list of all products', async function () {
      // arrange
      sinon.stub(productModel, 'findAllProducts').resolves(allProducts);
      
      // act
      const result = await passengerService.findAllProducts();

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
    });
    
    it('returns the correct product if it exists', async function () {
      // arrange
      sinon.stub(productModel, 'findProductById').resolves(allProducts[0]);
      
      // act
      const result = await productService.findProductsById(1);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
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
      sinon.stub(productModel, 'addProduct'.resolves(42));
      sinon.stub(productModel, 'findProductById').resolves(newAddedProduct);
      // act
      const result = await productService.addProduct('Iron Man Suit');
      
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.equal(newAddedProduct);
    });
    afterEach(function () {
      sinon.restore();
    });
  });
});