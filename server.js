var app = require('./server-config.js');

if (process.env.NODE_ENV === "production") {
  var port = process.env.PORT;
} else {
  var port = 4568;
}

console.log(port);

app.listen(port);
console.log('Server now listening on port ' + port);
