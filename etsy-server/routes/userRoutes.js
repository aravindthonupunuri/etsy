const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');

const Users = require('../model/User');
const Favourites = require('../model/Favourites')

router.post('/register', async (req, res) => {
    const {name, emailId, password} = req.body;
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    var newUser = new Users(
      {
        username: name,
        emailId: emailId,
        password: hashPassword
      }
    )
    Users.findOne({emailId: emailId}, (error, user) => {
      if (user) {res.status(400).send("email id already exists")}
      else {
        newUser.save(() => {
          res.send("user registered successfully")
        })
      }
    })
})

router.post('/login', (req, res) => {
    const {emailId, password} = req.body;
    Users.findOne({emailId: emailId}, async (err, data) => {
      if(err) res.status(400).send("invalid emailId");
      else {
        if(!data) res.status(204).send('invalid password'); 
        else {
          const comparision = await bcrypt.compare(password, data.password);
          if(comparision)
          {
              const token = jwt.sign({id : data._id}, process.env.Token_Secret);
              res.header('auth-token', token).status(200).send(token);   
          }
          else
            res.status(204).send('Email and password does not match'); 
        }       
      }
    })
})

router.get('/profile', verify, (req, res) => {
  Users.findOne({_id: req.user.id}, (err, result) => {
    if(err) res.status(400).send("invaid user");
    else res.status(200).send(result);
  })
})

router.put('/update/profile', verify, (req, res) => {
  //  const {emailId, username, profilePicture, phonenumber, gender, city, country, dateofbirth, address, about} = req.body;
   Users.findOne({_id: req.user.id}, (err, result) => {
    console.log(result);
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
