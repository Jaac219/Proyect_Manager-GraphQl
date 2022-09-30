const { GraphQLDateTime } = require('graphql-iso-date')

const Scalar = [`
    scalar GraphQLDateTime,
    scalar JSONObject
    
    input Option {
      limit: Int,
      page: Int
    }
`]

module.exports = Scalar;