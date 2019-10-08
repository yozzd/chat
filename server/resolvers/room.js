const Query = {
  async showRoom(_, { id }) {
    return {
      id,
      name: 'tes',
      user: 'tes',
    };
  },
};

const Mutation = {
  async createRoom(_, { name, user }) {
    return {
      id: 1,
      name,
      user,
    };
  },
};

module.exports = {
  Query,
  Mutation,
};
