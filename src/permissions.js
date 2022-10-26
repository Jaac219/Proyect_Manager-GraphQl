const { shield, rule, and, inputRule, deny } = require("graphql-shield");

const isAuthenticated = rule()(async (_, agrs, {req})=>{
  console.log(req.verifiedUser)
  return true;
})

module.exports = shield({
  Query:{
    Products_Get: isAuthenticated
  },
  Mutation: {

  }
})