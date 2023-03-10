const newAddeSaleMock = {
  "id": 42,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}

const newSaleReq = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

module.exports = { newAddeSaleMock, newSaleReq };