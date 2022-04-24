const router = require('express').Router();
const verify = require('./verifyToken');

const Shop = require('../model/Shop');
const Item = require('../model/Item');
const User = require('../model/User');

router.get('/shop', verify, async (req, res) => {
    Shop.find((err, results) => {
        if(err) res.status(400).send(error.message);
        else {
            let result = results.filter(
                res => res.shopownerId == req.user.id
            )
            res.status(200).send(result);
        }
    })
})

router.get('/shop/:shopName', verify, async (req, res) => {
    const {shopName} = req.params;
    Shop.find((err, results) => {
        if(err) res.status(400).send(error.message);
        else {
            let result = results.filter(
                res => res.shopname == shopName
            )
            res.status(200).send(result);
        }
    })
})

router.get('/shopOwnerProfile/:shopOwnerId', verify, async (req, res) => {
    const {shopOwnerId} = req.params;
    User.find({_id: shopOwnerId}, (err, data) => {
        if(err) res.status(400).send(error.message); 
        else res.status(200).send(data);       
    })
})

router.post('/upload/shop', verify, (req, res) => {
    Shop.find((err, data) => {
        const filteredData = data.filter( singledata => singledata.shopname === res.shopname)    
        if(filteredData.length != 0)  res.status(206).send("Shop name already present");
        else {var newShop = new Shop({...req.body, shopownerId: req.user.id})
        newShop.save((err, data) => {
            if(err) res.status(400).send(err.message);
            res.status(200).send(data);
        })}
    })
})

router.post('/shop/add/item', verify, (req, res) => {
    const { itemname, itemImageFileUrl, description, price, available_quantity, categoryid, shopname} = req.body;
    const newitem = new Item({
        itemname, 
        itemimage: itemImageFileUrl,
        description, price, available_quantity,
        category: categoryid, shopname
    })
    newitem.save((err, data) => {
        if(err) res.status(400).send(err.message)
        else res.status(200).send("Item successfully added to shop");
    })
})

router.put('/shop/update/itemQuantity', verify, (req, res) => {
    const { updated_quantity, id } = req.body;
    console.log("hi")
    console.log(id)
    Item.findOne({_id: id}, (err, data) => {
        if(err) console.log(err.message)
        console.log(data)
        Object.assign(data, {available_quantity: updated_quantity});
        console.log(data)
        data.save((err, data) => {
            if(err) {console.log("err"); res.status(400).send(err.message)}
            else {console.log("suce"); res.status(200).send("Item quantity updated");}
        })
    })
})

router.put("/shop/updatesalescount", verify, (req, res) => {
  const { salesCountMap } = req.body;
  let error = false;
    salesCountMap.forEach((mapping) => {
        Shop.findOne({shopname: mapping.shopname}, (err, data) => {
            if(err) error = true;
            else {
                Object.assign(data, {salescount: mapping.salescount})
                data.save()
            }
        })
    });
  
    if (error) {
      res.status(400).send(err.message);
    } else {
      res.send("Sales count updated");
    }
  });

router.put('/shop/update/item', verify, (req, res) => {
    const { id } = req.body;
    Item.findOne({_id: id}, (err, data) => {
        Object.assign(data, {...req.body, itemimage: req.body.itemImageFileUrl});
        data.save((err, data) => {
            if(err) res.status(400).send(err.message)
            else res.status(200).send("Item updated");
        })
    })
})

router.get('/shop/items/:shopname', verify, (req, res) => {
    const {shopname} = req.params;
    Item.find({shopname: shopname}, (err, data) => {
        if(err) res.status(400).send(err.message);
        else res.send(data);
    })
})

router.put("/shop/uploadImage", verify, (req, res) => {
    const { shopname, shopimage } = req.body;
    console.log(shopname + shopimage)
    Shop.findOne({shopname: shopname}, (err, data) => {
        if(err) res.status(400).send(err.message);
        else {
            console.log("hi" + data)
            Object.assign(data, {shopimage: shopimage})
            console.log(data)
            data.save((err, data) => {
                if(err) res.status(400).send(err.message)
                else res.status(200).send("shop image updated");
            })
        }
    })
  });

module.exports = router;