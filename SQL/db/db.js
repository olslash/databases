var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  database: 'chat',
  host: 'localhost',
  user: 'root',
  password: ''
});

dbConnection.connect();

var getMessages = function(params, cb) {
  var query = 'SELECT message_text, createdAt, id_room, id_user_from FROM messages';

  // // build query from params.

  if (params.room) {
    query = query.concat(' WHERE id_room = ' + 1); //params.room);
  }
  if (params.limit) {
    query = query.concat(' LIMIT ' + params.limit);
  }

  dbConnection.query(query, function(err, rows, fields) {
    if (err) throw err;
    cb(rows);
  });


};

var getAllRooms = function(cb) {
  var query = 'SELECT id, name_room FROM rooms';

  dbConnection.query(query, function(err, rows, fields) {
    if (err) throw err;

    var result = {};
    rows.forEach(function(row) {
      result[row.id] = row.name_room;
    });

    cb(result);
  });
};

var insertMessage = function(params, cb) {
  // require username, text, room
  // todo: implement error handling

  var id_user_from = params.id_user_from;
  var id_room = params.id_room;
  var message_text = params.message_text;

  var query = "INSERT INTO messages " +
    "(id_user_from, message_text, createdAt, id_room) " +
    "values (" + id_user_from + ", '" + message_text + "','" + new Date() + "', " + id_room + ")";

  dbConnection.query(query, function(err, rows) {
    if(err) { cb(err); } else { cb(null, rows.insertId); }
  });
};


module.exports = {
  getMessages   : getMessages,
  getAllRooms   : getAllRooms,
  insertMessage : insertMessage
};

// dbConnection.end();