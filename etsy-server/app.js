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

const userRoute = require('./routes/userRoutes');
const shopRoute = require('./routes/shopRoutes');
const homeRoute = require('./routes/homeRoutes');
const cartRoute = require('./routes/cartRoutes');

//Route Middlewares
app.use('/api/user', userRoute);
app.use('/api', shopRoute);
app.use('/api', homeRoute);
app.use('/api', cartRoute)

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));
