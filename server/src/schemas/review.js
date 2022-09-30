const reviewSchema = [`
  type Review {
    _id: String!
    date: GraphQLDateTime!
    title: String!
    comment: String!
    Rating: Int
  }

  type Query {
    Get_Reviews(filter: Review_Filter): [Review!]!
    Get_Review(id: String!): Review
  }

  type Mutation {
    Save_Review(input: Review_Input): ID
    Delete_Review(_id: String!): Boolean
  }

  input Review_Filter {
    name: String
  }

  input Review_Input {
    _id: String
    name: String!
  }
`]

module.exports = reviewSchema;