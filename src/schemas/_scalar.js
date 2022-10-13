const { GraphQLDateTime } = require('graphql-iso-date');

const Scalar = [`
    scalar GraphQLDateTime
    scalar JSONObject
    scalar Upload
    
    input Option {
      limit: Int
      page: Int
    }
`]

module.exports = Scalar;