const router = require('express').Router();
const verify = require('./verifyToken');

const Order = require('../model/Order');
const OrderItem = require('../model/OrderItem');

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
    var datetime = new Date();
    let error = false;
    items.forEach((item) => {
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
      })
    });
    if(error) res.status(400).send("error occured while adding items");
    else res.status(200).send("values inserted")
  });

  router.get("/user/orders", verify, async (req, res) => {
    console.log("orders...")
    
    OrderItem.find()
    .populate({path: 'orderid', select: ['total', 'userid']})
    .populate({path:'itemid', select: ['itemimage', 'itemname']})
    .then(docs => {
      docs = docs.filter(doc => doc.orderid.userid == req.user.id)
      res.status(200).json(docs.map(doc => {
        return {id: doc.orderid._id,
        itemid: doc._id,
        shopname: doc.shopname,
        price: doc.orderid.total,
        quantity: doc.quantity,
        createdTime: doc.createdtime,
        itemname: doc.itemid.itemname,
        itemimage: doc.itemid.itemimage,
        }
      }))
    })

  });

module.exports = router;