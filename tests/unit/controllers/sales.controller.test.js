const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { newSaleReq, newAddeSaleMock } = require('../models/mocks/sales.model.mock');
const { newSaleReqNoQuant, newSaleReqNoId } = require('./mocks/sales.controller.mock');
const { expect } = chai;
chai.use(sinonChai);

describe('Unit tests for product controller layer', function () {

  describe('Adding a new product', function () {
    it('should respond with 201 status new sale when successful', async function () {
      const req = newSaleReq;
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'addNewSale').resolves({ type: null, message: newAddeSaleMock });

      await salesController.addNewSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newAddeSaleMock);

    })
  

    it('should return an error if the quantity is undefined', async function () {
      const req = newSaleReqNoQuant;
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.addNewSale(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith('"quantity" is required');


    })
  
    it('should return an error if the productId is undefined', async function () {
      const req = newSaleReqNoId;
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesontroller.addNewSale(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith('"productId" is required');


    });
  });

  afterEach(function () {
    sinon.restore();
  });
});