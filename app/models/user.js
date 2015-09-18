var Schema = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

Schema.userSchema.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    callback(isMatch);
  });
}

Schema.userSchema.methods.hashPassword = function(password, callback) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(password, null, null).bind(this)
    .then(function(hash) {
      callback(hash);
    });
}

var User = mongoose.model('User', Schema.userSchema);

module.exports = User;
