const mysql = require('mysql')

config = {
    host: 'etsyaws.chglohlvtuj2.us-east-2.rds.amazonaws.com',
    user: 'aravind',
    password: 'password',
    database: 'EtsyDb',
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