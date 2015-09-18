var Schema = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

Schema.urlSchema.methods.setup = function(callback) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  callback(shasum.digest('hex').slice(0, 5));
};

var Url = mongoose.model('Url', Schema.urlSchema);

module.exports = Url;
