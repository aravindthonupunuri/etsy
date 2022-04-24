const Favourites = require('../../model/Favourites');

function handle_request(req, callback){
console.log("handling fav req")
  var fav = new Favourites(
    {
      itemId: req.itemId,
      userId: req.userId
    }
  )
  fav.save((err, result) =>{
    if(err){
      callback(null, null);
    } else {
        callback(null, result) 
    }
  })

    console.log("after callback");
};

exports.handle_request = handle_request;  