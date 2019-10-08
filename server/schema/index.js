const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Room {
    id: String!
    name: String!
    user: String!
  }

  type Query {
    showRoom(id: String): Room
  }

  type Mutation {
    createRoom(name: String!, user: String!): Room
  }
`;

module.exports = typeDefs;
