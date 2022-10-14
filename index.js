require("dotenv").config();
require("./src/db.js");

const { makeExecutableSchema } = require("@graphql-tools/schema");
const { graphqlUploadExpress } = require("graphql-upload");
const jwt = require("jsonwebtoken");

const { ApolloServer } = require("apollo-server-express");
const express = require("express");

const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const app = express();

const typeDefs = require("./src/merge/mergeSchemas.js");
const resolvers = require("./src/merge/mergeResolvers.js");

app.use(express.static('public'));
app.use(graphqlUploadExpress());

// app.use(async (req, res, next)=>{
//   let token = req.headers.authorization?.split(' ')[1] || "";
//   if(token){
//     req.verifiedUser = jwt.verify(token, JWT_SECRET);
//   }
//   next();
// })

app.get('/', (req, res) =>{
  res.send('welcome');
})

async function start() {
  const schema = makeExecutableSchema({typeDefs, resolvers})
  const apolloServer = new ApolloServer({ 
    context: ctx=>ctx,
    schema
  });
  await apolloServer.start();

  apolloServer.applyMiddleware({app})
  app.listen(PORT, (req, res)=>{
    console.log(`Servidor iniciado en el puerto ${PORT} 🚀`);
  })
}

start();