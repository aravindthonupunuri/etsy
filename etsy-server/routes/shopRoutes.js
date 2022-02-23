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
    const {shopname, shopimage} = req.body;
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
                    [shopname, shopimage, req.user.id, 0],
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


router.get('/item/categories', verify, (req, res) => {
    connection.query(
        "SELECT * FROM ItemCategory"  ,(err, result) =>{
            if(err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
})


router.post('/item/add/category', verify, (req, res) => {
    const {category} = req.body;

    connection.query(
        "INSERT INTO ItemCategory (category) values (?)" , [category], (err, result) =>{
            if(err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
})


router.post('/shop/add/item', verify, (req, res) => {
    const { itemname, itemimage, description, price, available_quantity, category_id, shopname} = req.body;
    console.log(category_id);
    connection.query(
        "INSERT INTO Items (id, itemname, itemimage, description, price, available_quantity, category_id, shopname) values (?,?,?,?,?,?,?,?)",
        [uuidv4(), itemname, itemimage, description, price, available_quantity, category_id, shopname],
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
    const { id, itemname, description, price, available_quantity} = req.body;

    let sql = "UPDATE Items SET itemname = ?, description = ?, price = ?, available_quantity = ? where id = ?";

    connection.query(
        sql, [itemname, description, price, available_quantity, id],
        (error, result) =>{
            if(error) {
                console.log(error)
                res.status(400).send(error.message)
            } else {
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

module.exports = router;