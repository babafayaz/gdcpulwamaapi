var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : '103.20.215.198',
    user     : 'roomush',
    password : 'Roomush@123#',
    database : 'gdcpul'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;