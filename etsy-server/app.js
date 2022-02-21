//import express module
var express = require("express");
//create  an express app
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
app.use(express.static(path.join(__dirname, 'public')));

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use("/api/user", signupRouter);

app.get("/", function (req, res) {
  res.send("I am here");
});

app.listen(3001);
console.log("Server Listening on port 3001");

module.exports = app;
