const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/db');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};

module.exports.getUserByUserName = function(username, callback) {
  const query = { username: username };
  User.findOne(query, callback);
};

module.exports.addUser = function(newUser, callback) {
  newUser.save(callback);
};

module.exports.authenticateUser = function(username, password, passwordAttempt, callback) {
  User.findOne({ 'username': username }, function(err, user) {
    if (err) {
      return callback(err);
    } else if (!user) {
      return callback(err);
    }

    bcrypt.compare(passwordAttempt, password, function(err, isMatch) {
      if (isMatch === true) {
        return callback(null, isMatch);
      } else {
        return callback();
      }
    });
  });
};