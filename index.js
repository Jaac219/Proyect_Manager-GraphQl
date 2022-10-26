require("dotenv").config();
require("./src/db.js");

const { makeExecutableSchema } = require("@graphql-tools/schema");
const { graphqlUploadExpress } = require("graphql-upload");
const { applyMiddleware } = require("graphql-middleware");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const permissions = require("./src/permissions");
const jwt = require("jsonwebtoken");

const typeDefs = require("./src/merge/mergeSchemas.js");
const resolvers = require("./src/merge/mergeResolvers.js");

const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const app = express();

app.use(express.static('public'));
app.use(graphqlUploadExpress());

// Apply authentication middleware
// app.use(async (req, res, next)=>{
//   let token = req.headers.authorization.split(' ')[1] || "";
//   if(token){
//     try {
//       req.verifiedUser = jwt.verify(token, JWT_SECRET);
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   next();
// });

app.get('/', (req, res) =>{
  res.send('welcome');
});

async function start() {
  const schema = makeExecutableSchema({typeDefs, resolvers});
  // const schemaWithPermissions = applyMiddleware(schema, permissions);
  
  const apolloServer = new ApolloServer({ 
    schema,
    context: ctx=>ctx
  });
  await apolloServer.start();

  apolloServer.applyMiddleware({app});
  app.listen(PORT, (req, res)=>{
    console.log(`Servidor iniciado en el puerto ${PORT} 🚀`);
  });
}

start();