var connection = new require('./kafka/connection');
require("dotenv").config();

   const mongoDB = 'mongodb+srv://EtsyDb:aravind1234@etsycluster.4fknc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
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

const userRegistration = require('./services/userServices/registerService');
const userLogin = require('./services/userServices/loginService');
const userProfile = require('./services/userServices/profileService');
const userFavourite = require('./services/userServices/favouriteService');
const userOrder = require('./services/userServices/orderService');

function handleTopicRequest(topic_name,fname){

  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log('server is running ');
  consumer.on('message', function (message) {
      console.log('message received for ' + topic_name +" ", fname);
      console.log(JSON.stringify(message.value));
      var data = JSON.parse(message.value);
      
      fname.handle_request(data.data, function(err,res){
          console.log('after handle'+res);
          var payloads = [
              { topic: data.replyTo,
                  messages:JSON.stringify({
                      correlationId:data.correlationId,
                      data : res
                  }),
                  partition : 0
              }
          ];
          console.log("payload is")
          console.log(payloads);
          producer.send(payloads, function(err, data){
              console.log(data);
          });
          return;
      });
      
  });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("user-register", userRegistration)
handleTopicRequest("user-login", userLogin)
handleTopicRequest("user-profile", userProfile)
handleTopicRequest("user-favourite", userFavourite)
handleTopicRequest("user-order", userOrder)
