const allProducts = [
  {
    id: 1,
    name: 'Martelo do Thor',
  },
  {
    id: 2, 
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name:'Escudo do Capitão América',
  },
]

const newProductWrongName = {
  name: 'ab'
};

const newAddedProduct = {
  id: 42,
  name: 'Iron Man Suit'
}

module.exports = { products, newProductWrongName, newAddedProduct};