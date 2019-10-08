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
    confirmRoom(name: String!): Room
    createRoom(name: String!, user: String!): Room
    joinRoom(id: String!, user: String!): Room
  }
`;

module.exports = typeDefs;
