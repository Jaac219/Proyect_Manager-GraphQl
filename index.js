require("dotenv").config();
require("./src/db.js");

const { makeExecutableSchema } = require("@graphql-tools/schema");
const { graphqlUploadExpress } = require("graphql-upload");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");


const PORT = process.env.PORT;
const app = express();

const typeDefs = require("./src/merge/mergeSchemas.js");
const resolvers = require("./src/merge/mergeResolvers.js");


app.get('/', (req, res) =>{
  res.send('welcome');
})

async function start() {
  const schema = makeExecutableSchema({typeDefs, resolvers})
  const apolloServer = new ApolloServer({ schema });
  await apolloServer.start();
  
  app.use(express.static('public'));
  app.use(graphqlUploadExpress());

  apolloServer.applyMiddleware({app})
  app.listen(PORT, (req, res)=>{
    console.log(`Servidor iniciado en el puerto ${PORT} 🚀`);
  })
}

start();