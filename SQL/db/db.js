var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  database: 'chat',
  host: 'localhost',
  user: 'root',
  password: ''
});

dbConnection.connect();



//select * from messages join users ON messages.id_user_from = users.id_user JOIN rooms ON messages.id_room = rooms.id;
//select message_text, name_user, name_room from messages join users ON messages.id_user_from = users.id_user JOIN rooms ON messages.id_room = rooms.id;
//

var getMessages = function(params, cb) {
  // var query = 'SELECT id_message, message_text, createdAt, id_room, id_user_from FROM messages';

  var query = 'select createdAt, message_text, name_user, name_room from messages join users ' +
  'ON messages.id_user_from = users.id_user JOIN rooms ON messages.id_room = rooms.id';

  if (params.room) { query = query.concat(' WHERE id_room = ' + params.room); }

  query = query.concat(' ORDER BY id_message DESC');

  if (params.limit) { query = query.concat(' LIMIT ' + params.limit); }

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
    "values (" + id_user_from + ", '" + message_text + "','" + new Date() + 
      "', " + id_room + ")";

  dbConnection.query(query, function(err, rows) {
    if(err) { cb(err); } else { cb(null, rows.insertId); }
  });
};

module.exports = {
  getMessages   : getMessages,
  getAllRooms   : getAllRooms,
  insertMessage : insertMessage
};
