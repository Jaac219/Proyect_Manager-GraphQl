require("dotenv").config();
require("./src/db.js");

const { makeExecutableSchema } = require("@graphql-tools/schema");
const { createServer } = require('http')
const { WebSocketServer } =require('ws');
const { execute, subscribe } = require('graphql')

const { graphqlUploadExpress } = require("graphql-upload");
// const { applyMiddleware } = require("graphql-middleware");

const { useServer } = require('graphql-ws/lib/use/ws')
// const permissions = require("./src/permissions");
// const jwt = require("jsonwebtoken");

const typeDefs = require("./src/merge/mergeSchemas.js");
const resolvers = require("./src/merge/mergeResolvers.js");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const { ApolloServerPluginLandingPageProductionDefault } = require('apollo-server-core');

const PORT = process.env.PORT;
const app = express();
// const JWT_SECRET = process.env.JWT_SECRET;

app.use(express.static('public'));
app.use(graphqlUploadExpress());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
  next()
})

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
    plugins: [
      ApolloServerPluginLandingPageProductionDefault({ 
        embed: true 
      }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              serverCleanup.dispose();
            }
          };
        },
      }
    ],
    context: ctx=>ctx,
  });

  const httpServer = createServer(app)
  const wsPath = '/ws'

  const subscriptionServer = new WebSocketServer({
    server: httpServer,
    path: wsPath,
  })

  const serverCleanup = useServer({
    schema,
    execute, 
    subscribe,
  }, subscriptionServer)

  await apolloServer.start();

  apolloServer.applyMiddleware({app});

  httpServer.listen(PORT, (req, res)=>{
    console.log(`Servidor iniciado en el puerto ${PORT} 🚀`);
  });
}

start();