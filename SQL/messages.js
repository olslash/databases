var utils = require('./utils.js');

var send404 = function(response, data) {
  utils.sendResponse(response, data, 404);
};

var sendGetResponse = function(req, res) {
  utils.sendResponse(res, 'ok');
};

var sendPostResponse = function(req, res) {
  utils.collectData(request, function(err, data) {

  });
  utils.sendResponse(res, 'ok');
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