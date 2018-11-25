const request = require('request');
const config = require('./../config/config');
const moment = require('moment');
var {mongoose} = require('./../db/mongoose');

var User = mongoose.model('User', {
  userId: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  locale: {
    type: String
  },
  timeZone: {
    type: String
  },
  gender: {
    type: String
  },
  medication: {
    name: {
      type: String
    },
    schedule: {
      type: Number
    },
    reminder: {
      type: String
    }
  },
  startTime: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: null
  }
});

module.exports = {User};