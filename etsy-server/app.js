//import express module
var express = require("express");
//create  an express app
var connection = require("./pool.js");
var app = express();
var path = require('path');
var signupRouter = require("./routes/signup");
//require express middleware body-parser
var bodyParser = require("body-parser");
//require express session
var session = require("express-session");
//require cookie parser
var cookieParser = require("cookie-parser");
//import cors
var cors = require('cors');

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/", signupRouter);
app.use(express.static(path.join(__dirname, 'public')));

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.get("/", function (req, res) {
  res.send("I am here");
});

app.post("/test", (req, res) => res.send("post test"));

app.post("/create/profile", (req, res) => {
  const { name, emailId, password } = req.body;
  console.log(req.body);

  connection.query(
    "INSERT INTO users (name, email_id, password) values (?,?,?)",
    [name, emailId, password],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(401).send(err.message);
        // throw(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/getUser/:name", (req, res) => {
  const {name} = req.params;
  connection.query(
    "SELECT name, password from users where name = ?",
    [name], (err, result) => {
      console.log(result);
      if (err) {
        console.log(err);
        res.status(401).send(err.message);
        // throw(err);
      } else {
        res.send(result);
      }
    }
  );
})

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,OPTIONS,POST,PUT,DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
//   );
//   res.setHeader("Cache-Control", "no-cache");
//   next();
// });

app.listen(3001);
console.log("Server Listening on port 3001");

module.exports = app;
