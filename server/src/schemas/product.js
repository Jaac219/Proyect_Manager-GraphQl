const productSchema = [`
  type Product {
    _id: String!
    name: String!
    description: String
    quantity: Int!
    image: String
    price: Float!
    onSale: Boolean!
    categoryId: String!
    category: Category
    reviews: [Review!]!
    isRemove: Boolean
  }

  type Query {
    Get_Products(filter: Product_Filter, option: Option): [Product!]!
    Get_Product(id: String!): Product
  }

  type Mutation {
    Save_Product(productInput: Product_Input): ID
    Delete_Product(_id: String!): Boolean
    Update_Quantity(_id: String!, option: Option_Quantity!, value: Int!): ID
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
    ADD
    SUBTRACT
  }
`];

module.exports = productSchema;