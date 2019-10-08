const Room = require('./room');

const resolvers = {
  Query: { ...Room.Query },
  Mutation: { ...Room.Mutation },
  Subscription: { ...Room.Subscription },
};

module.exports = resolvers;
