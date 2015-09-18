var Schema = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

var urlSchema = Schema.urlSchema;

//Methods

urlSchema.methods.setup = function(callback) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  callback(shasum.digest('hex').slice(0, 5));
};

var Url = mongoose.model('Url', urlSchema);

module.exports = Url;

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function(){
//     this.on('creating', function(model, attrs, options){
//     });
//   }
// });

// module.exports = Link;
