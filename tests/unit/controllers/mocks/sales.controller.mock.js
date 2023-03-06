

const newSaleReqNoQuant = [
  {
    "productId": 1,
    "quantity": undefined,
  },
];


const newSaleReqNoId = [
  {
    "productId": undefined,
    "quantity": 1,
  },
];

const allSales = [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
]

const saleById = [
  {
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
]
module.exports = { newSaleReqNoId, newSaleReqNoQuant, allSales, saleById};