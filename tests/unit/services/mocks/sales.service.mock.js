const newSaleWrongIdMock =
  [
  {
    "productId": 0,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
  ];

const newSaleWrongQuantityMock =
  [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 0
  }
  ];

//   const newAddeSaleMock = {
//   "id": 3,
//   "itemsSold": [
//     {
//       "productId": 1,
//       "quantity": 1
//     },
//     {
//       "productId": 2,
//       "quantity": 5
//     }
//   ]
// }

module.exports = { newSaleWrongIdMock, newSaleWrongQuantityMock };