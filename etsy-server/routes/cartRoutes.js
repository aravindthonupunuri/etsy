const router = require('express').Router();
const { connection } = require('../dbconfig');
const verify = require('./verifyToken');
const { v4: uuidv4 } = require('uuid');

router.post('/cart/additem', verify, (req, res) => {
    const { itemid, shopname, quantity} = req.body;
    connection.query(
        "INSERT INTO Cart (id, itemid, userid, quantity, shopname) values (?,?,?,?,?)",
        [uuidv4(), itemid, req.user.id, quantity, shopname],
        (error, result) =>{
            if(error) {
                console.log(error)
                res.status(400).send(error.message)
            } else {
                res.status(200).send("Item successfully added to Cart");
            }
        }
    )
})

router.get('/cart/items', verify, (req, res) => {
    console.log("in get cart items.");
    connection.query(
        "SELECT * FROM Cart where userid = ?", 
        [req.user.id],
        (error, result) =>{
            if(error) {
                console.log(error)
                res.status(400).send(error.message)
            } else {
                res.send(result);
            }
        }
    )    
})

router.delete("/cart/:cartId", verify, (req, res) => {
    const {cartId} = req.params;
    // console.log("in delete fav" + itemId)
    connection.query(
      "DELETE FROM Cart where id = ?", [cartId],
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