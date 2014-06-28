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
    var restPath = path.substring(6); // noooooo -- make the routing regex capture this

    if(restPath === '/all') {
      // list all rooms
      db.getAllRooms(function(rooms) {
        utils.sendResponse(res, rooms, 'application/json');
      });
    } else {
      // GET rooms/<id>
      var idReg = /[0-9]+/;
      // room ID from url
      var roomID = idReg.exec(restPath);
      if (roomID) {
        roomID = roomID[0]; 

        var limit = query.limit || 100; // default for now

        db.getMessages({
          room: roomID,
          limit: limit
        }, function(rows) {
          utils.sendResponse(res, rows, 'application/json');
        });        
      }

    }
  } else if (req.method === 'POST') {
    utils.collectData(req, function(err, data) {
      db.insertMessage(data, function(err, newMessageID) {
        if(err) { 
          utils.sendResponse(res, err, 'text/plain', 500); // todo: what's the correct code?
        } else {
          utils.sendResponse(res, newMessageID, 'application/json', 201);  
        }
      });
    });
    
  }
};

var users = function(req, res, path, query) {
  if(req.method === 'OPTIONS') { sendGenericOptionsResponse(res); }
  else if(req.method === 'GET') {
    var restPath = path.substring(6); // noooooo -- make the routing regex capture this
    
    if(path === '/rooms/all') {
      // list all users by name/id
      db.getAllRooms(function(rooms) {
        utils.sendResponse(res, rooms, 'application/json');
      });
    }
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