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


// const mysql = require('mysql');
// const dotenv = require('dotenv');
// dotenv.config();

// config = {
//   connectionLimit: 510,
//   host: 'etsyaws.chglohlvtuj2.us-east-2.rds.amazonaws.com',
//   user: 'aravind',
//   password: 'password',
//   database: 'EtsyDb',
//   insecureAuth : true
// }

// const connection = mysql.createPool(config);

// connection.getConnection((err) => {
//     if(err){
//       throw 'Error occured: ' + err;
//     }
//   });

  
// module.exports.connection = connection;