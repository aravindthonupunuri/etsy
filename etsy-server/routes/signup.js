const express = require("express");
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var connection = require("../pool.js");

//REGISTER
router.post('/register', async (req, res) => {
    const {name, emailId, password} = req.body;
    console.log(req.body);

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    connection.query(
        "INSERT INTO User (username, emailId, password, phonenumber, profilePicture, gender, city, country, dateofbirth, address) values (?,?,?,?,?,?,?,?,?,?)",
        [name, emailId, hashPassword, null, null, null, null, null, null, null],
        (error, result) =>{
            if(error) {
                console.log(error)
                res.status(400).send(error.message)
            } else {
                res.status(200).send("User successfully registered");
            }
        }
    )
})


//LOGIN
router.post('/login', (req, res) => {
    const {emailId, password} = req.body;

    connection.query('SELECT * FROM User WHERE emailId = ?',[emailId], async function (error, result) {
        if (error) {
          res.send({
            "code":400,
            "failed":"error ocurred"
          })
        }else{
          if(result.length > 0){
              
            const comparision = await bcrypt.compare(password, result[0].password)
            if(comparision){
                const token = jwt.sign({id : result[0].emailId}, process.env.Token_Secret);                
                res.header('auth-token', token).send({
                  "code":200,
                  "success":"login sucessfull"
                })
            }
            else{
              res.send({
                   "code":204,
                   "success":"Email and password does not match"
              })
            }
          }
          else{              
            res.send({
              "code":206,
              "success":"Email does not exits"
            });
          }
        }
    });
})

module.exports = router;
