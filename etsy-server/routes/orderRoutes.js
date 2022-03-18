const router = require('express').Router();
const { connection } = require('../dbconfig');
const verify = require('./verifyToken');
const { v4: uuidv4 } = require('uuid');

router.post("/order", verify, (req, res) => {
    const { price } = req.body;
    var datetime = new Date();
    var orderid = uuidv4();
    connection.query(
      "INSERT INTO Orders (id, userid, total, createdtime) values (?,?,?,?)",
      [orderid, req.user.id, price, datetime],
      (error, result) => {
        if (error) {
        //   console.log(error);
          res.status(400).send(error.message);
        } else {
          res.status(200).send(orderid);
        }
      }
    );
  });

router.post("/order/addItems", verify, (req, res) => {
    const { orderId, items } = req.body;
    var datetime = new Date();
    let error = false;
    items.forEach((item) => {
      var orderLineitemId = uuidv4();
      connection.query(
        `INSERT into OrderItems(id, orderid, itemid, shopname, price, quantity, createdtime) 
         values(?,?,?,?,?,?,?)`,
        [
          orderLineitemId,
          orderId,
          item.id,
          item.shopname,
          item.price,
          item.requestedQuantity,
          datetime,
        ],
        (err, result) => {
          if (err) {
            if(!error) error = true;
          }
        }
      );
    });
    if(error) res.status(400).send("error occured while adding items");
    else res.status(200).send("values inserted")
  });

  router.get("/user/orders", verify, (req, res) => {
      console.log("in user orders")
    connection.query(
      `Select o.id, o.total, oi.itemid, oi.shopname, oi.price, oi.quantity, oi.createdTime, i.itemimage, i.itemname
      from 
      Orders as o 
      JOIN
      OrderItems as oi
      ON o.id = oi.orderid
      JOIN Items AS i
      ON oi.itemid = i.id 
      where o.userId = ?`,
      [req.user.id],
      (err, result) => {
        debugger;
        if (err) {
          res.status(400).send(err.message);
        } else {
          res.send(result);
        }
      }
    );
  });

module.exports = router;