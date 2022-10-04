const productSchema = [`
  type Product {
    _id: String!
    name: String!
    description: String
    quantity: Int!
    image: String
    price: Float!
    onSale: Boolean!
    categoryId: String
    category: Category
    reviews: [Review!]!
    isRemove: Boolean
  }

  type Query {
    Products_Get(filter: Product_Filter, option: Option): [Product!]!
    Product_Get(id: String!): Product
  }

  type Mutation {
    Product_Save(productInput: Product_Input): ID
    Product_Delete(_id: String!): Boolean
    Update_Quantity(_id: String!, option: Option_Quantity!, value: Int!): Boolean
  }

  input Product_Filter {
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

  enum Option_Quantity {
    INC
    DEC
  }
`];

module.exports = productSchema;