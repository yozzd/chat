const { PubSub } = require('apollo-server');
const Room = require('../models/room.js');
const User = require('../models/user.js');

const CREATED_USER = 'CREATED_USER';

const pubsub = new PubSub();

const Query = {
  async showRoom(_, { id }) {
    const room = await Room.findById(id)
      .populate({
        path: 'users',
        options: { sort: 'name' },
      })
      .populate({ path: 'messages', populate: { path: 'user' } });
    return room;
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

const Subscription = {
  createdUser: {
    subscribe: () => pubsub.asyncIterator([CREATED_USER]),
  },
};

module.exports = {
  Query,
  Mutation,
  Subscription,
};
