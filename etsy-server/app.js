//import express module
var express = require("express");
//create  an express app
var app = express();
var path = require('path');
//require express middleware body-parser
var bodyParser = require("body-parser");
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
// app.use("/api/user", signupRouter);

// app.get("/", function (req, res) {
//   res.send("I am here");
// });

// app.listen(3001);
// console.log("Server Listening on port 3001");

// module.exports = app;

const userRoute = require('./routes/userRoutes');
const shopRoute = require('./routes/shopRoutes');
const homeRoute = require('./routes/homeRoutes');

//Route Middlewares
app.use('/api/user', userRoute);
app.use('/api', shopRoute);
app.use('/api', homeRoute);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));
