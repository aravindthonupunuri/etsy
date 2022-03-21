const router = require('express').Router();
const { connection } = require('../dbConfig');
const verify = require('./verifyToken');

router.get('/items', verify, (req, res) => {
    connection.query(
        "SELECT * FROM Items" , (err, result) =>{
            if(err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                res.send(result);
            }
        }
    )
})

router.get('/item/:itemId', verify, (req, res) => {
    const {itemId} = req.params;
    connection.query(
        "SELECT * FROM Items where id = ?" , [itemId], (err, result) =>{
            if(err) {
                res.send(err.message);
            } else {
                res.send(result[0]);
            }
        }
    )
})

module.exports = router;