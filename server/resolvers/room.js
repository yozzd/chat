const Room = require('../models/room.js');
const User = require('../models/user.js');

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
  async confirmRoom(_, { name }) {
    const room = await Room.findOne({ name });
    return room;
  },
  async createRoom(_, { name, user }) {
    const newUser = new User({ name: user });
    const usr = await newUser.save();

    const newRoom = new Room({ name, users: usr.id });
    const room = await newRoom.save();
    room.user = usr.id;

    return room;
  },
  async joinRoom(_, { id, user }) {
    const newUser = new User({ name: user });
    const usr = await newUser.save();

    await pubsub.publish(CREATED_USER, { createdUser: usr });

    const room = await Room.findById(id);
    room.users.push(usr.id);
    const r = await room.save();
    r.user = usr.id;

    return r;
  },
};

module.exports = {
  Query,
  Mutation,
};
