const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar DateTime

  type Room {
    id: String!
    name: String!
    user: String!
    users: [User]
    messages: [Message]
  }

  type User {
    id: String!
    name: String!
  }

  type Message {
    id: String!
    text: String!
    room: String!
    user: User
    createdAt: DateTime!
  }

  type Query {
    showRoom(id: String): Room
    allMessages: [Message]
  }

  type Mutation {
    confirmRoom(name: String!): Room
    createRoom(name: String!, user: String!): Room
    joinRoom(id: String!, user: String!): Room
    createMessage(text: String!, room: String!, user: String!): Message
  }

  type Subscription {
    createdUser: User
    createdMessage: Message
  }
`;

module.exports = typeDefs;
