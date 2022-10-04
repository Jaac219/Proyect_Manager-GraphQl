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
    Get_Reviews(filter: Review_Filter, option: Option): [Review!]!
    Get_Review(id: String!): Review
  }

  type Mutation {
    Save_Review(reviewInput: Review_Input): ID
    Delete_Review(_id: String!): Boolean
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