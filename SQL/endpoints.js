var utils = require('./utils.js');
var db    = require('./db/db.js');

var root = function(req, res, query) {
  if(req.method === 'OPTIONS') { sendGenericOptionsResponse(res); }
  else if(req.method === 'GET') {
    utils.sendResponse(res, 'index. valid endpoints are /rooms, /users', 200);
  } else if (req.method === 'POST') {
    sendGenericNotImplementedResponse(res);
  }
};

var rooms = function(req, res, query) {
  if(req.method === 'OPTIONS') { sendGenericOptionsResponse(res); }
  else if(req.method === 'GET') {
    console.log(query);
  } else if (req.method === 'POST') {
    // 202 accepted
  }
};

var users = function(req, res, query) {
  if(req.method === 'OPTIONS') { sendGenericOptionsResponse(res); }
  else if(req.method === 'GET') {

  } else if (req.method === 'POST') {
    // create a new user 
  }
};

var sendGenericOptionsResponse = function(res) {
  utils.sendResponse(res, {}, 200);
};

var sendGenericNotImplementedResponse = function(res) {
  utils.sendResponse(res, {}, 501);
};
module.exports = {root: root, rooms: rooms, users: users};