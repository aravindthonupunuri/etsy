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
// const passport = require('passport');
// require('./Utils/passport')
// app.use(passport.initialize());

// const config = {
   const mongoDB = 'mongodb+srv://EtsyDb:aravind1234@etsycluster.4fknc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
   // };
   const mongoose = require('mongoose');
   var options = {
       useNewUrlParser: true,
       useUnifiedTopology: true,
       poolSize: 500,
       bufferMaxEntries: 0
     };
   
   mongoose.connect(mongoDB, options, (err, res) => {
       if (err) {
           console.log(err);
           console.log(`MongoDB Connection Failed`);
       } else {
           console.log(`MongoDB Connected`);
       }
     });

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
const orderRoute = require('./routes/orderRoutes');

//Route Middlewares
app.use('/api/user', userRoute);
app.use('/api', shopRoute);
app.use('/api', homeRoute);
app.use('/api', cartRoute);
app.use('/api', orderRoute);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
