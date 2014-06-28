var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  database : 'chat',
  host     : 'localhost',
  user     : 'root',
  password : ''
});

dbConnection.connect();

var getMessages = function(params, cb) {
  // return a bunch of messages as JSON, responding to filters for:
  // roomname,
  // message limit,
  // after a certain date. -- todo later
  // var query = 'SELECT message_text, createdAt, id_room, id_user_from FROM messages';

  // // build query from params.

  // if(params.room) {
  //   query = query.concat(' WHERE id_room = ' + 1);//params.room);
  // }
  // if(params.limit) {
  //   query = query.concat(' LIMIT ' + params.limit);
  // }

  // dbConnection.query(query, function(err, rows, fields) {
  //   if (err) throw err;
  //     cb(rows);
  // });
  

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

var insertIntoDB = function(params) {

};


module.exports = {getMessages: getMessages, getAllRooms: getAllRooms};


// dbConnection.query("select name_user from users", function(err, rows, fields) {
//   if (err) throw err;

//   console.log(rows);
//   console.log(fields);
//   // rows.forEach(function(row) {

//   //   console.log('Response is: ' + row['name_user']);
//   // });
// });

// dbConnection.end();
