const bcrypt = require('bcryptjs');
const Users = require('../model/User');
const jwt = require('jsonwebtoken');

class UserModule {
    responseGenerator = (statusCode, message) => ({
        status: statusCode,
        response: message
    })
    login = async(customerDetails) => {
        console.log("Inside customerProfile kafka backend");
        const {emailId, password} = customerDetails;
        Users.findOne({emailId: emailId}, async (err, data) => {
            if(err) return this.responseGenerator(404, err.message);
            else {
              if(!data) return this.responseGenerator(404, "login failed");
              else {
                const comparision = await bcrypt.compare(password, data.password);
                if(comparision)
                {
                    const token = jwt.sign({id : data._id}, process.env.Token_Secret);                    
                    return this.responseGenerator(200, token);
                }
                else return this.responseGenerator(204, "Email and password does not match");       
              }       
            }
          })
    }

    register = async(customerDetails) => {
        const {name, emailId, password} = customerDetails;

            Users.findOne({emailId: emailId}, async (err, cust) => {
                console.log("user find one")
            if(err) return this.responseGenerator(404, err.message);
            else if(cust) callback("error", null);
            else {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);
                var newUser = new Users(
                  {
                    username: name,
                    emailId: emailId,
                    password: hashPassword
                  }
                )
    
                newUser.save((err, data) => {
                    if(data) return this.responseGenerator(200, data);  
                    else return this.responseGenerator(404, err.message);
                })
            }
        })
    }
}

module.exports = UserModule;