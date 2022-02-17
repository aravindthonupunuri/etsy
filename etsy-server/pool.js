const mysql = require('mysql')

config = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'etsy',
    port: 3306,
    insecureAuth : true
 }

var connection =mysql.createConnection(config);
connection.connect(function(err){
  if (err){
    console.log('error connecting:' + err.stack);
  }
  else console.log('connected successfully to DB.');
});

module.exports = connection 