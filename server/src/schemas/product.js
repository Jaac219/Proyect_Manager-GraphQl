const productSchema = [`
  type Product {
    _id: String!
    name: String!
    description: String!
    quantity: Int!
    image: String!
    price: Float!
    onSale: Boolean!
    categoryId: String!
    category: Category
    reviews: [Review!]!
  }

  type Query {
    Get_Products(filter: Product_Filter): [Product!]!
    Get_Product(id: String!): Product
  }

  type Mutation {
    Save_Product(input: Product_Input): ID
    Delete_Product(_id: String!): Boolean
  }

  input Product_Filter {
    name: String
    description: String
    quantity: Int
    price: Float
    onSale: Boolean
    category: Category_Filter
  }

  input Product_Input {
    _id: String
    name: String
    description: String
    quantity: Int
    price: Float
    onSale: Boolean
  }
`];

module.exports = productSchema;