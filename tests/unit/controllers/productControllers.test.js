const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');
const {allProductsControllerMock, productMock} = require('./mocks/product.controller.mock')
const { expect } = chai;
chai.use(sinonChai);

describe('Unit tests for product controller layer', function () {
  describe('Lists all products', function () {
    it('should return 200 status and products list', async function () {
      const res = {};
      const req = {};
    
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'findAllProducts').resolves({ type: null, message: allProductsControllerMock })
   
      await productController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsControllerMock);
   
    });
  });
  describe('Searching for a product by id', function () {
    it('should respond with 200 status and db data when id exists', async function () {
      const req = {
        params: {id: 1}
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'findProductById').resolves({type: null, message: productMock});

      await productController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productMock);

    })
  })

  it('should return an error if the id does not exist', async function () {
    const req = {
      params: {id: 9999}
    };
    const res = {};

    res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'findProductById').resolves({type: PRODUCT_NOT_FOUND, message: 'Product not found'});

      await productController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith('Product not found');


  })
  afterEach(function () {
    sinon.restore();
  });
});