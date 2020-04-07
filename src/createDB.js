const mysql = require('mysql');
const dbConfig = require('./db/config');
const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password
});

connection.connect(function(err) {
    if (err) throw err;
    
    connection.query("CREATE DATABASE IF NOT EXISTS mydb", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
    
    connection.end();

});