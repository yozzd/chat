const Room = require('./room');
const Message = require('./message');

const resolvers = {
  Query: { ...Room.Query, ...Message.Query },
  Mutation: { ...Room.Mutation, ...Message.Mutation },
  Subscription: { ...Room.Subscription, ...Message.Subscription },
};

module.exports = resolvers;
