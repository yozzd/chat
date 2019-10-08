const { Schema, model } = require('mongoose');
const shortid = require('shortid');
const timestamps = require('mongoose-timestamp');

const UserSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  name: String,
});

UserSchema.plugin(timestamps);

module.exports = model('User', UserSchema, 'user');
