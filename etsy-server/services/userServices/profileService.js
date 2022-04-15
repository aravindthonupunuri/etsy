const Users = require('../../model/User');

function handle_request(req, callback){
    console.log("jjjj")
    console.log(req.id)
    if(req){
        Users.findOne({_id: req.id}, (err, result) => {
            if(err) callback(null, null);
            else callback(null, result) ;
          })
    }

    console.log("after callback");
};

exports.handle_request = handle_request;  