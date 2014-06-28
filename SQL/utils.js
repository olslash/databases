exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
};

var sendResponse = function(response, data, contentType, statusCode) {
  statusCode = statusCode || 200;
  contentType = contentType || "text/plain";

  response.setHeader('Content-Type', contentType);
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

var send404 = function(res, data) {
  sendResponse(res, data, 404);
};

var collectData = function(request, cb) {
  var data = "";

  request.on("data", function(chunk) {
    data += chunk; 
  });

  request.on("end", function() {
    cb(null, JSON.parse(data));  
  });
};

module.exports = {
  sendResponse : sendResponse,
  send404      : send404,
  collectData  : collectData
};