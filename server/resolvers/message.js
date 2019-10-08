const { PubSub } = require('apollo-server');
const Message = require('../models/message.js');
const Room = require('../models/room.js');

const CREATED_MESSAGE = 'CREATED_MESSAGE';

const pubsub = new PubSub();

const Query = {
  async allMessages() {
    const messages = Message.find();
    return messages;
  },
};

const Mutation = {
  async createMessage(_, { text, room, user }) {
    const newMessage = new Message({ text, room, user });
    const m = await newMessage.save();

    const r = await Room.findById(room);
    r.messages.push(m);
    await r.save();

    const mm = await Message.findById(m.id).populate('user');

    await pubsub.publish(CREATED_MESSAGE, { createdMessage: mm });

    return mm;
  },
};

const Subscription = {
  createdMessage: {
    subscribe: () => pubsub.asyncIterator([CREATED_MESSAGE]),
  },
};

module.exports = {
  Query,
  Mutation,
  Subscription,
};
