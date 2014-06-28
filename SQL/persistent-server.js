
/* You already know how to create an http server from the previous
 * assignment; you can re-use most of that code here. */

var path = require('path');
var http = require('http');
var url  = require('url');

var utils = require('./utils.js');
var endpoints = require('./endpoints.js');

var router = {
  '\/rooms.*' : endpoints.rooms,
  '\/users.*' : endpoints.users,
  '^\/$'      : endpoints.root
};

var handleRequest = function(req, res) {
  var url_parts = url.parse(req.url, true);
  var path = url_parts.path;
  var query = url_parts.query;

  var served = false;
  for(var route in router) {
    var regexRoute = new RegExp(route);

    if(regexRoute.test(path)) {
      router[route](req, res, path, query);
      served = true;
      break;
    }
  }

  if(!served) {
    utils.send404(res, 'not found.');
  }
};

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
