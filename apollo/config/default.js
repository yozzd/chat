import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

export default () => {
  const httpLink = new HttpLink({
    // uri: 'http://0.0.0.0:5000/graphql',
    uri: 'https://shielded-chamber-29516.herokuapp.com/graphql',
  });

  const wsLink = new WebSocketLink({
    // uri: 'ws://0.0.0.0:5000/graphql',
    uri: 'wss://shielded-chamber-29516.herokuapp.com/graphql',
    options: {
      reconnect: true,
      lazy: true,
    },
  });

  wsLink.subscriptionClient.maxConnectTimeGenerator.duration = () =>
    wsLink.subscriptionClient.maxConnectTimeGenerator.max;

  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
  );

  return {
    link,
    cache: new InMemoryCache(),
    defaultHttpLink: false,
  };
};
