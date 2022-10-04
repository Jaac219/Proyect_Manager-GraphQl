const reviewSchema = [`
  type Review {
    _id: String!
    date: GraphQLDateTime!
    title: String!
    comment: String!
    rating: Select_Rating
    productId: String!
    product: Product!
    isRemove: Boolean
  }

  type Query {
    Reviews_Get(filter: Review_Filter, option: Option): [Review!]!
    Review_Get(id: String!): Review
  }

  type Mutation {
    Review_Save(reviewInput: Review_Input): ID
    Review_Delete(_id: String!): Boolean
  }

  input Review_Filter {
    date: GraphQLDateTime
    title: String
    comment: String
    rating: Select_Rating
    productId: String
  }

  input Review_Input {
    _id: String
    date: GraphQLDateTime
    title: String
    comment: String
    rating: Select_Rating
    productId: String
  }

  enum Select_Rating {
    EXCELENTE
    BUENO
    PROMEDIO
    MALO
    MUYMALO
  }
`]

module.exports = reviewSchema;