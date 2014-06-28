
/* You already know how to create an http server from the previous
 * assignment; you can re-use most of that code here. */
var mysql = require('mysql');
var path = require('path');
var http = require('http');

var utils = require('./utils.js');
var messages = require('./messages.js');


var handleRequest = function(request, response) {

  // var path = url.parse(request.url).pathname;
  var method = request.method;
  if (router[method]) {
    router[method](request, response);
  } else {
    console.log('not in router');
    // httphelpers.send404(request, response);
  }
};

var router = {
  // 'POST'   : httphelpers.postResponse,
  'GET'     : messages.sendGetResponse,
  'POST'   : messages.sendPostResponse,
  'OPTIONS' : messages.sendOptionsResponse
};

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

// var dbConnection = mysql.createConnection({
//   database : 'chat',
//   host     : 'localhost',
//   user     : 'root',
//   password : ''
// });

// dbConnection.connect();

// dbConnection.query("select name_user from users", function(err, rows, fields) {
//   if (err) throw err;

//   console.log(rows);
//   console.log(fields);
//   // rows.forEach(function(row) {

//   //   console.log('Response is: ' + row['name_user']);
//   // });
// });

// dbConnection.end();










//server will repsond to GET requests for messages in a given room
//
//// /?room="whatever"&limit="10"&time="lt: <date>"
//server will respond to POST requests to post messages 
//// 




