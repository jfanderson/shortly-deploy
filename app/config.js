var Bookshelf = require('bookshelf');
var path = require('path');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

if (process.env.NODE_ENV === "production") {
  mongoose.connect(/* server mongo pathway */);
} else {
  mongoose.connect('mongodb://127.0.0.1:27017/shortly');
}

module.exports.userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports.urlSchema = new Schema({
  url: { type: String, required: true},
  base_url: { type: String, required: false},
  code: { type: String, required: false}, 
  title: { type: String, required: true}, 
  visits: { type: Number, required: true}
});
