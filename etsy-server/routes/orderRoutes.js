const router = require('express').Router();
const { connection } = require('../dbconfig');
const verify = require('./verifyToken');
const { v4: uuidv4 } = require('uuid');

router.post('/order', verify, (req, res) => {
    // const { quantity } = req.body;
    var datetime = new Date();
    var orderid = uuidv4();
    connection.query(
        "INSERT INTO Orders (id, userid, total, createdtime) values (?,?,?,?)",
        [orderid, req.user.id, 0, datetime],
        (error, result) =>{
            if(error) {
                console.log(error)
                res.status(400).send(error.message)
            } else {
                console.log("posted to order")
                res.status(200).send({orderid});
            }
        }
    )
})

router.post('/order/additem', verify, (req, res) => {
    const { orderid, itemid, shopname, price, quantity } = req.body;
    var datetime = new Date();
    connection.query(
        "INSERT INTO OrderItems (id, orderid, itemid, shopname, price, quantity, createdtime) values (?,?,?,?,?,?,?)",
        [uuidv4(), orderid, itemid, shopname, price, quantity, datetime],
        (error, result) =>{
            if(error) {
                console.log(error)
                res.status(400).send(error.message)
            } else {
                console.log("item added")
                res.status(200).send("item added to my orders");
            }
        }
    )
})

module.exports = router;