const { Schema, model } = require('mongoose');
const shortid = require('shortid');
const timestamps = require('mongoose-timestamp');

const MessageSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  text: String,
  room: String,
  user: { type: String, ref: 'User' },
});

MessageSchema.plugin(timestamps);

module.exports = model('Message', MessageSchema, 'message');
