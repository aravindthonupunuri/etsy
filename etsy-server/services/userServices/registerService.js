const bcrypt = require('bcryptjs');
const Users = require('../../model/User');

function handle_request(customerDetails, callback){
   
    console.log("Inside customerProfile kafka backend");
    console.log(customerDetails);
    const {username, email, password} = customerDetails;

    if(customerDetails){
        Users.findOne({emailId: email}, async (err, cust) => {
            console.log("user find one")
        if(err) callback(null, null);
        else if(cust) callback("error", null);
        else {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            var newUser = new Users(
              {
                username: username,
                emailId: email,
                password: hashPassword
              }
            )

            newUser.save((err, data) => {
                if(data) callback(null, data)  
                else callback(err, null)
            })
        }
    })

    console.log("after callback");
}
};

exports.handle_request = handle_request;