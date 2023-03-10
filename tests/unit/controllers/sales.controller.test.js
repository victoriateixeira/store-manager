const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { newSaleReq, newAddeSaleMock } = require('../models/mocks/sales.model.mock');
const { newSaleReqNoQuant, newSaleReqNoId, allSales, saleById } = require('./mocks/sales.controller.mock');
const {validateNewSaleProductId, validateNewSaleProductQuantity} = require('../../../src/middlewares/validateNewSale');
const { expect } = chai;
chai.use(sinonChai);

describe('Unit tests for sales controller layer', function () {

  describe('Adding a new sale', function () {
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
      const req = {
        body: newSaleReqNoQuant
      }
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
validateNewSaleProductQuantity(req, res);
      // await salesController.addNewSale(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });


    })
  
    it('should return an error if the productId is undefined', async function () {
   const req = {
        body: newSaleReqNoId
      }
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

     validateNewSaleProductId(req, res);
      // await salesController.addNewSale(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });


    });
  });

  describe('Finding all sales', function () {
    it('should respond with 200 status and all sales list', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'listAllSales').resolves({ type: null, message: allSales });

      await salesController.listAllSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSales);

    });
    it('should respond with 200 status and the sale by the id', async function () {
       const req = {
      params: {id: 3}
    };;
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'findSaleById').resolves({ type: null, message: saleById });

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleById);

    });
    it('should respond with 404 status and an error message if the sale does not exist', async function () {
       const req = {
      params: {id: 9999}
    };;
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'findSaleById').resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });

    });
  
  });

  describe('Deleting a sale', function () {
    it('should respond with 204 status  when successful', async function () {
      const req = {
        params: {id: 42}
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'deleteSale').resolves({type: null, message: ''});

      await salesController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(204);
      

    })
  

    it('should return an error if the id does not exist', async function () {
    const req = {
      params: { id: 999999 },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'deleteSale').resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });

      await salesController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({message: 'Sale not found'});
    })
    
  })
  afterEach(function () {
    sinon.restore();
  });
});