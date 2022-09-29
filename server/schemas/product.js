const productSchema = [`
  type Query {
    hello: String
    product: [Product!]!
  }

  type Product {
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
  }
`];

module.exports = productSchema;