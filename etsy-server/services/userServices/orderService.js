const Order = require('../../model/Order');

function handle_request(req, callback){
console.log("handling fav req")
var datetime = new Date();
const order = new Order({
  userid: req.userId,
  total: req.price,
  createdtime: datetime
})
order.save((error, result) => {
  if (error) {
    callback(null, null);
  } else {
    callback(null, result._id) 
  }
})
    console.log("after callback");
};

exports.handle_request = handle_request;  