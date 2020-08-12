var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'WEBIDC10.znetlive.com:3306',
    user     : 'roomush',
    password : 'Roomush@123#',
    database : 'gdcpul'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;