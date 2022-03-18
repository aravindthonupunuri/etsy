const router = require('express').Router();
const { connection } = require('../dbconfig');
const verify = require('./verifyToken');
const { v4: uuidv4 } = require('uuid');

router.get('/shop', verify, async (req, res) => {
    console.log(req.user);
    console.log("in get shops");
    try {
        let results = await getShops();
        let result = results.filter(
            res => res.shopownerId == req.user.id
        )
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get('/shop/:shopName', verify, async (req, res) => {
    console.log(req.user);
    const {shopName} = req.params;
    console.log("in get shops shopName " + shopName);
    try {
        let results = await getShops();
        console.log(results)
        let result = results.filter(
            res => res.shopname == shopName
        )
        console.log(result)
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get('/shopOwnerProfile/:shopOwnerId', verify, async (req, res) => {
    console.log(req.user);
    const {shopOwnerId} = req.params;
    console.log("in get shops shopName " + shopOwnerId);
    connection.query(
        "SELECT * from User user where user.id = ?", [shopOwnerId],
        (err, result) => {
            if(err){
              res.status(400).send(error.message);
            } else {
                res.status(200).send(result);
            }
        }
    )
})

getShops = () => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM Shop", (error, results) => {
                if(error)
                {
                    return reject(error);
                }
                return resolve(results);
            }
        )
    })
}


router.post('/upload/shop', verify, (req, res) => {
    const {shopname, shopimage, salescount} = req.body;
    console.log(req.user);

    try {
        getShops().then( (result) => {
            let shops = [];
            result.forEach(r => {
                shops.push(r.shopname)
            });
            if(shops.indexOf(shopname) == -1)
            {
                connection.query(
                    "INSERT INTO Shop (shopname, shopimage, shopownerId, salescount) values (?,?,?,?)",
                    [shopname, shopimage, req.user.id, salescount],
                    (error, results) =>{
                        if(error) {
                            console.log(error);
                            res.status(400).send(error.message);
                        } else {
                            res.status(200).send(results);
                        }
                    }
                )
            }
            else
            {
                res.status(206).send("Shop name already present");
            }
        })
        .catch(e => {
            console.log('There has been a problem with your promise operation: ' + e.message);
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.post('/shop/add/item', verify, (req, res) => {
    const { itemname, itemImageFileUrl, description, price, available_quantity, categoryid, shopname} = req.body;
    console.log("itemimage is ..." + itemImageFileUrl);
    connection.query(
        "INSERT INTO Items (id, itemname, itemimage, description, price, available_quantity, category, shopname) values (?,?,?,?,?,?,?,?)",
        [uuidv4(), itemname, itemImageFileUrl, description, price, available_quantity, categoryid, shopname],
        (error, result) =>{
            if(error) {
                console.log(error)
                res.status(400).send(error.message)
            } else {
                res.status(200).send("Item successfully added to shop");
            }
        }
    )
})


router.put('/shop/update/item', verify, (req, res) => {
    const { id, itemname, itemImageFileUrl, description, price, available_quantity, category} = req.body;

    let sql = "UPDATE Items SET itemname = ?, itemimage = ?, description = ?, price = ?, category = ?, available_quantity = ? where id = ?";

    connection.query(
        sql, [itemname, itemImageFileUrl, description, price, available_quantity, category, id],
        (error, result) =>{
            if(error) {
                console.log(error)
                res.status(400).send(error.message)
            } else {
                console.log("updated item.")
                res.status(200).send("Item updated");
            }
        }
    )
})

router.get('/shop/items/:shopname', verify, (req, res) => {
    const {shopname} = req.params;
    
    connection.query(
        "SELECT * FROM Items where shopname = ?" , [shopname] , (err, result) =>{
            if(err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
})

router.put("/shop/uploadImage", verify, (req, res) => {
    const { shopname, shopimage } = req.body;
  
    connection.query(
      "UPDATE Shop SET shopimage = ? where shopname = ?",
      [shopimage, shopname],
      (error, result) => {
        if (error) {
          console.log(error);
          res.status(400).send(error.message);
        } else {
          console.log("uploaded image" + result);
          res.status(200).send("Image uploaded");
        }
      }
    );
  });

module.exports = router;