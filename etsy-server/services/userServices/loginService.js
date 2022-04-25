const bcrypt = require('bcryptjs');
const Users = require('../../model/User');
const jwt = require('jsonwebtoken');

function handle_request(customerDetails, callback){
   
    console.log("Inside customerProfile kafka backend");
    const {email, password} = customerDetails;

    if(customerDetails){
        Users.findOne({emailId: email}, async (err, data) => {
            if(err) callback(null, null);
            else {
              if(!data) callback(null, null);
              else {
                const comparision = await bcrypt.compare(password, data.password);
                if(comparision)
                {
                    const token = jwt.sign({id : data._id}, process.env.Token_Secret);                    
                    callback(null, token) 
                }
                else callback(null, null);                
              }       
            }
          })
    }

    console.log("after callback");
};

exports.handle_request = handle_request;