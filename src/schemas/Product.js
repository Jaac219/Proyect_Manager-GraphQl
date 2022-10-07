const productSchema = [`
  type Product {
    _id: String!
    name: String!
    description: String
    quantity: Int!
    image: String
    price: Float!
    rating: Int
    onSale: Boolean!
    categoryId: String
    reviews: [Review]
  }

  type Query {
    Products_Get(filter: Product_Filter, option: Option): [Product!]!
    Product_Count(filter: Product_Filter):Int
  }

  type Mutation {
    Product_Save(productInput: Product_Input): ID
    Product_Delete(_id: String!): Boolean
  }

  input Product_Filter {
    _id: String
    name: String
    description: String
    quantity: Int
    price: Float
    onSale: Boolean
  }

  input Product_Input {
    _id: String
    name: String
    description: String
    quantity: Int
    image: String
    price: Float
    onSale: Boolean
    categoryId: String
  }
`];

module.exports = productSchema;