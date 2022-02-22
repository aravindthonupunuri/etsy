const router = require('express').Router();
const { connection } = require('../dbconfig');
const verify = require('./verifyToken');


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


router.get('/shop/items/:shopname', verify, async (req, res) => {
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



router.post('/shop/add/item', verify, async (req, res) => {
    const { itemname, itemimage, category_id, description, price, available_quantity, shopname} = req.body;

    connection.query(
        "INSERT INTO Items (itemname, itemimage, category_id, description, price, available_quantity, shopname) values (?,?,?,?,?,?,?)",
        [itemname, itemimage, category_id, description, price, available_quantity, shopname],
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




module.exports = router;