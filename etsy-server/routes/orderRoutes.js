const router = require('express').Router();
const { connection } = require('../dbConfig');
const verify = require('./verifyToken');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const Order = require('../model/Order');
const OrderItem = require('../model/OrderItem')

router.post("/order", verify, (req, res) => {
    const { price } = req.body;
    var datetime = new Date();
    const order = new Order({
      userid: req.user.id,
      total: price,
      createdtime: datetime
    })
    order.save((error, result) => {
      if (error) {
        res.status(400).send(error.message);
      } else {
        res.status(200).send(result._id);
      }
    })
  });

router.post("/order/addItems", verify, (req, res) => {
    const { orderId, items } = req.body;
    // console.log(orderId);
    var datetime = new Date();
    let error = false;
    items.forEach((item) => {
      // console.log(item)
      const orderitem = new OrderItem({
        orderid: orderId,
        itemid: item.id,
        shopname: item.shopname,
        price: item.price,
        quantity: item.requestedQuantity,
        createdtime: datetime,
      })
      orderitem.save((err, result) => {
        if (err) {
          console.log(err.message)
          if(!error) error = true;
        }
        // else console.log(result)
      })
    });
    if(error) res.status(400).send("error occured while adding items");
    else res.status(200).send("values inserted")
  });

  router.get("/user/orders", verify, (req, res) => {
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