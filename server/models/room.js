const { Schema, model } = require('mongoose');
const shortid = require('shortid');
const timestamps = require('mongoose-timestamp');

const RoomSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  name: String,
  users: [{ type: String, ref: 'User' }],
  messages: [{ type: String, ref: 'Message' }],
});

RoomSchema.plugin(timestamps);

module.exports = model('Room', RoomSchema, 'room');
