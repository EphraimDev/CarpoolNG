const mongoose = require('mongoose');
const timestampPlugin = require('./plugins/timestamp');

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: false
  }
});

UserSchema.plugin(timestampPlugin);

module.exports = mongoose.model('user', UserSchema);
