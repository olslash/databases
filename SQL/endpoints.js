var utils = require('./utils.js');
var db    = require('./db/db.js');

var root = function(req, res, path, query) {
  if(req.method === 'OPTIONS') { sendGenericOptionsResponse(res); }
  else if(req.method === 'GET') {
    utils.sendResponse(res, 'index. valid endpoints are /rooms, /users');
  } else if (req.method === 'POST') {
    sendGenericNotImplementedResponse(res);
  }
};

var rooms = function(req, res, path, query) {
  if(req.method === 'OPTIONS') { sendGenericOptionsResponse(res); }
  else if(req.method === 'GET') {
    if(path === '/rooms/all') {
      db.getAllRooms(function(rooms) {
        utils.sendResponse(res, rooms, 'application/json')
      });
    }
  } else if (req.method === 'POST') {
    // 202 accepted
  }
};

var users = function(req, res, path, query) {
  if(req.method === 'OPTIONS') { sendGenericOptionsResponse(res); }
  else if(req.method === 'GET') {

  } else if (req.method === 'POST') {
    // create a new user 
  }
};

var sendGenericOptionsResponse = function(res) {
  utils.sendResponse(res, {});
};

var sendGenericNotImplementedResponse = function(res) {
  utils.sendResponse(res, {}, 'method not supported here.', 501);
};
module.exports = {root: root, rooms: rooms, users: users};