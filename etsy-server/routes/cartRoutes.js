const router = require('express').Router();
const verify = require('./verifyToken');

const Cart = require('../model/Cart');

router.post('/cart/additem', verify, (req, res) => {
    const { itemid, shopname, quantity} = req.body;
    // console.log(req.user.id + itemid)
    var cart = new Cart({
      itemid: itemid,
      userid: req.user.id,
      quantity: quantity,
      shopname: shopname
    })
    cart.save((error, result) =>{
      if(error) {
          // console.log(error)
          res.status(400).send(error.message)
      } else {
          res.status(200).send("Item successfully added to Cart");
      }
  })
})

router.put("/cart/updateitem", verify, (req, res) => {
    const { itemid, shopname, quantity } = req.body;
    Cart.findOne({itemid: itemid, shopname: shopname, userid: req.user.id}, (err, data) => {
      if(err) res.status(400).send(err.message)
      else {
        Object.assign(data, {quantity: quantity})
        data.save((error, result) => {
          if (error) {
            res.status(400).send(error.message);
          } else {
            res.status(200).send("Item updated successfully in Cart");
          }
        })
      }
    })
});

router.get('/cart/items', verify, (req, res) => {
    Cart.find({userid: req.user.id}, (error, result) =>{
      if(error) {
          // console.log(error)
          res.status(400).send(error.message)
      } else {
          res.send(result);
      }
  })    
})

router.delete("/cart", verify, (req, res) => {
  Cart.deleteOne({userid: req.user.id}, (err, result) => {
    if(err){
      res.status(400).send(err.message);
    } else {
        res.status(200).send(result);
    }
})  
})

module.exports = router;