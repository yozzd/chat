const Room = require('../models/room.js');

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
    const newRoom = new Room({ name });
    const room = await newRoom.save();
    room.user = user;

    return room
  },
};

module.exports = {
  Query,
  Mutation,
};
