const reviewSchema = [`
  type Review {
    _id: String!
    title: String!
    comment: String!
    rating: Float
    productId: String!
    createdAt: GraphQLDateTime
  }

  type Query {
    Reviews_Get(filter: Review_Filter, option: Option): [Review!]!
    Review_Count(filter: Review_Filter):Int
  }

  type Mutation {
    Review_Save(reviewInput: Review_Input): ID
    Review_Delete(_id: String!): Boolean
  }

  input Review_Filter {
    _id: String
    title: String
    rating: Int
    productId: String
    createdAt: GraphQLDateTime
  }

  input Review_Input {
    _id: String
    title: String
    comment: String
    rating: Int
    productId: String
  }
`]

module.exports = reviewSchema;