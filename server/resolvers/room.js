const Query = {
  async showRoom(_, { id }) {
    return {
      id,
      name: 'tes'
    };
  },
};

const Mutation = {
  async createRoom(_, { name, user }) {
    return {
      id: 1,
      name,
    };
  },
};

module.exports = {
  Query,
  Mutation,
};
