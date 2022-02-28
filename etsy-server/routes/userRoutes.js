const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const verify = require('./verifyToken');

const db = require('../dbconfig');
var connection = db.connection;

router.post('/register', async (req, res) => {
    const {name, emailId, password} = req.body;
    console.log(req.body);
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    connection.query(
        "INSERT INTO User (id, username, emailId, password, phonenumber, profilePicture, gender, city, country, dateofbirth, address) values (?,?,?,?,?,?,?,?,?,?,?)",
        [uuidv4(), name, emailId, hashPassword, null, null, null, null, null, null, null],
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

router.post('/login', (req, res) => {
    const {emailId, password} = req.body;
    connection.query('SELECT * FROM User WHERE emailId = ?',[emailId], async function (error, result) {
        if (error) 
        {
          res.status(400).send(error.message);
        }
        else
        {
          if(result.length > 0) 
          {
            console.log(result);
            const comparision = await bcrypt.compare(password, result[0].password);
            if(comparision)
            {
                const token = jwt.sign({id : result[0].id}, process.env.Token_Secret);
                res.header('auth-token', token).status(200).send(token);
            }
            else
              res.status(204).send('Email and password does not match');
          }
          else
          {
            res.status(206).send('Email does not exits');
          }
        }
    });
})

router.get('/profile', verify, (req, res) => {
    console.log(req.params);
    connection.query(
        "SELECT * from User user where user.id = ?", [req.user.id],
        (err, result) => {
            if(err){
              res.status(400).send(error.message);
            } else {
                res.status(200).send(result);
            }
        }
    )
})

router.put('/update/profile', verify, (req, res) => {
   const {emailId, username, phonenumber, gender, city, country, dateofbirth, address, about} = req.body;
   console.log(req.user.id);
   let sql = "UPDATE User SET emailId = ?, username = ?, phonenumber = ?, gender = ?, city = ?, country = ?, dateofbirth = ?, address = ?, about = ? where id = ?";
   connection.query(
    sql, [emailId, username, phonenumber, gender, city, country, dateofbirth, address, about, req.user.id],
    (err, result) =>{
        if(err){
          res.status(400).send(error.message);
        } else {
            res.status(200).send(result);
        }
    }
  )
})

router.put("/uploadProfilePic", verify, (req, res) => {
  const {image} = req.body;
  console.log(req.body);

  connection.query(
      "UPDATE User SET profilePicture = ? where id = ?",
      [image, req.user.id],
      (err, result) =>{
          if(err){
            res.status(400).send(error.message);
          } else {
              res.status(200).send(result);
          }
      }
  )
});

router.post("/add/favourite", verify, (req, res) => {
  const {itemId} = req.body;
  console.log(req.body);
  connection.query(
      "INSERT into Favourites(id, itemId, userId) values(?,?,?)",
      [uuidv4(), itemId, req.user.id],
      (err, result) =>{
          if(err){
            res.status(400).send(err.message);
          } else {
              res.status(200).send(result);
          }
      }
  )
});

router.get("/favourites", verify, (req, res) => {
  connection.query(
      "SELECT * FROM Favourites where userId = ?", [req.user.id],
      (err, result) => {
          if(err){
            res.status(400).send(err.message);
          } else {
              res.status(200).send(result);
          }
      }
  )
});

router.delete("/favourites/:itemId", verify, (req, res) => {
  const {itemId} = req.params;
  console.log("in delete fav" + itemId)
  connection.query(
    "DELETE FROM Favourites where itemId = ?", [itemId],
    (err, result) => {
        if(err){
          res.status(400).send(err.message);
        } else {
            res.status(200).send(result);
        }
    }
)  
})


module.exports = router;
