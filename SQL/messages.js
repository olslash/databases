var utils = require('./utils.js');
var db = require('./db/db.js');
var url = require('url');




var sendGetResponse = function(req, res) {
  var dbQuery = '';
  var url_parts = url.parse(req.url, true);
  var queryString = url_parts.query;
  console.log(queryString);
  if (queryString.getAllRooms) {
    // this is a request for a list of rooms
    db.getAllRooms(function(rooms) {
      // send client the list of rooms in some format
      console.log(rooms);
    });
  } else {

    // parse query as json
    var testSelect = 'select messages.message_text, messages.createdAt, users.name_user \
              FROM messages, users \
              WHERE messages.id_user_from = users.id_user;';

    // select messages.message_text, messages.createdAt, users.name_user FROM messages, users WHERE
    // 
    // I want to do this query by room name
    // specify a room name, and get messages and usernames

    utils.sendResponse(res, 'ok');
  }
};

var sendPostResponse = function(req, res) {
  var query;
  utils.collectData(req, function(err, data) {
    query = data;

  });
};


var sendOptionsResponse = function(req, res) {
  utils.sendResponse(res, 'ok');
};



module.exports = {
  send404: send404,
  sendGetResponse: sendGetResponse,
  sendPostResponse: sendPostResponse,
  sendOptionsResponse: sendOptionsResponse
};