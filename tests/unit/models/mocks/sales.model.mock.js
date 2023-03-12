const newAddeSaleMock = {
  "id": 42,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    }
    // {
    //   "productId": 2,
    //   "quantity": 5
    // }
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

const allSales = [
  {
    "saleId": 1,
    "date": "2023-03-11T15:24:43.000Z",
    "productId": 1,
    "quantity": 1
  },
  {
    "saleId": 1,
    "date": "2023-03-11T15:24:43.000Z",
    "productId": 2,
    "quantity": 5
  },
  {
    "saleId": 2,
    "date": "2023-03-11T15:24:43.000Z",
    "productId": 3,
    "quantity": 15
  }
]

const saleById = [
  {
    "date": "2023-03-11T15:24:43.000Z",
    "productId": 1,
    "quantity": 1
  },
  {
    "date": "2023-03-11T15:24:43.000Z",
    "productId": 2,
    "quantity": 5
  }
] 

module.exports = { newAddeSaleMock, newSaleReq, allSales, saleById };