const categorySchema = [`
  type Category {
    _id: String!
    name: String!
    products: [Product]
    isRemove: Boolean
  }

  type Query {
    Get_Categories(filter: Category_Filter, option: Option): [Category!]!
    Get_Category(id: String!): Category
  }

  type Mutation {
    Save_Category(categoryInput: Category_Input): ID
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