const categorySchema = [`
  type Category {
    _id: String!
    name: String!
    products: [Product]
  }

  type Query {
    Categories_Get(filter: Category_Filter, option: Option): [Category!]!
    Category_Count(filter: Category_Filter):Int
  }

  type Mutation {
    Category_Save(categoryInput: Category_Input): ID
    Category_Delete(_id: String!): Boolean
  }

  type Subscription {
    Category_Save: Category
  }

  input Category_Filter {
    _id: String
    name: String
  }

  input Category_Input {
    _id: String
    name: String!
  }
`]

module.exports = categorySchema;