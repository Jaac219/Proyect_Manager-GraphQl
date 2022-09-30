const categorySchema = [`
  type Category {
    _id: String!
    name: String!
    products: [Product!]!
  }

  type Query {
    Get_Categories(filter: Category_Filter): [Category!]!
    Get_Category(id: String!): Category
  }

  type Mutation {
    Save_Category(input: Category_Input): ID
    Delete_Category(_id: String!): Boolean
  }

  input Category_Filter {
    name: String
  }

  input Category_Input {
    _id: String
    name: String!
  }
`]

module.exports = categorySchema;