const { Schema, model } = require('mongoose');
const shortid = require('shortid');
const timestamps = require('mongoose-timestamp');

const RoomSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  name: String,
});

RoomSchema.plugin(timestamps);

module.exports = model('Room', RoomSchema, 'room');
