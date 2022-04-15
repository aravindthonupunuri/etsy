const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');
var kafka = require('../kafka/client')
const Users = require('../model/User');
const Favourites = require('../model/Favourites')

router.post('/register', (req, res) => {
  console.log("in register")
  kafka.make_request('user-register', req.body, function(err, results){
      console.log('inside after kafka message')
      console.log(results);
      console.log("error is" + err)
        if (!results) {res.status(400).send("email id already exists")}
       else{
              res.send("user registered successfully");
          }
  })
})

router.post('/login', (req, res) => {

  kafka.make_request('user-login', req.body, function(err, results){
    console.log('inside after kafka message')
    console.log(results);
    console.log("error is" + err)
      if (!results) {res.status(400).send("invalid emailId")}
     else{
         res.header('auth-token', results).status(200).send(results); 
        }
  })
})

router.get('/profile', verify, (req, res) => {
  console.log("profile..")
  console.log(req.user)
  kafka.make_request('user-profile', req.user, function(err, results){
    console.log('inside after kafka message')
    console.log(results);
    console.log("error is" + err)
      if (!results) res.status(400).send("invaid user");
     else res.status(200).send(results); 
  })
})

router.put('/update/profile', verify, (req, res) => {
  //  const {emailId, username, profilePicture, phonenumber, gender, city, country, dateofbirth, address, about} = req.body;
   Users.findOne({_id: req.user.id}, (err, result) => {
    // console.log(result);
    Object.assign(result, req.body);
    result.save(
      (err, data) => {
      if(err) { console.log(err); res.status(400).send("error while updating profile")}
      else res.status(200).send(data) 
      }
    )
   }
  )
})

router.put("/uploadProfilePic", verify, (req, res) => {
  const {image} = req.body;
  const obj = {profilePicture: image}
  Users.findOne({_id: req.user.id}, (err, result) => {
    Object.assign(result, obj);
    result.save(
      (err, data) => {
      if(err) { console.log(err); res.status(400).send("error while updating profile image")}
      else res.status(200).send(data) 
      }
    )
  })
});

router.post("/add/favourite", verify, (req, res) => {
  const {itemId} = req.body;
  var fav = new Favourites(
    {
      itemId: itemId,
      userId: req.user.id
    }
  )
  fav.save((err, result) =>{
    if(err){
      res.status(400).send(err.message);
    } else {
        res.status(200).send(result);
    }
  })
});

router.get("/favourites", verify, (req, res) => {
  Favourites.find({userId: req.user.id}, (err, result) => {
    if(err){
      res.status(400).send(err.message);
    } else {
        res.status(200).send(result);
    }
})
});

router.delete("/favourites/:itemId", verify, (req, res) => {
  const {itemId} = req.params;
  // console.log("in delete fav" + itemId)
  Favourites.deleteOne({itemId: itemId}, (err, result) => {
    if(err){
      res.status(400).send(err.message);
    } else {
        res.status(200).send(result);
    }
})  
})


module.exports = router;
