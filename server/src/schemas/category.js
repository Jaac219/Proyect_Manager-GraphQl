const categorySchema = [`
  type Category {
    _id: String!
    name: String!
    products: [Product]
    isRemove: Boolean
  }

  type Query {
    Categories_Get(filter: Category_Filter, option: Option): [Category!]!
    Category_Get(id: String!): Category
  }

  type Mutation {
    Category_Save(categoryInput: Category_Input): ID
    Category_Delete(_id: String!): Boolean
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