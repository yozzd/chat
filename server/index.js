const express = require('express');
const { Nuxt, Builder } = require('nuxt');
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const app = express();

const config = require('../nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production';

async function start() {
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
  apolloServer.applyMiddleware({ app });

  const httpServer = createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);

  app.use(nuxt.render);

  httpServer.listen(port, host, () => {
    console.log(
      `Server ready at http://${host}:${port}${apolloServer.graphqlPath}`
    );
    console.log(
      `Subscriptions ready at ws://${host}:${port}${
        apolloServer.subscriptionsPath
      }`
    );
  });
}
start();
