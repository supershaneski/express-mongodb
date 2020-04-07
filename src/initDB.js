const mysql = require('mysql');
const dbConfig = require('./db/config');
const connection = mysql.createConnection(dbConfig);

connection.connect(function(err) {
    if (err) throw err;
    
    let sql = `CREATE TABLE IF NOT EXISTS todo (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), date DATETIME, state INTEGER)`;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
    
    connection.end();

});