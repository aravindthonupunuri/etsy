const mysql = require('mysql')
const dotenv = require('dotenv');

dotenv.config();

config = {
    host: 'etsyaws.chglohlvtuj2.us-east-2.rds.amazonaws.com',
    user: 'aravind',
    password: 'password',
    database: 'EtsyDb',
    port: 3306,
    insecureAuth : true
 }

 const connection = mysql.createConnection(config); 

 connection.connect(function(err){
   if (err){
     console.log('error connecting:' + err.message);
   }
   else{
     console.log('connected successfully to DB.');
   }
 });
 
 module.exports.connection = connection;