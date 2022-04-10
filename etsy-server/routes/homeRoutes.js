const router = require('express').Router();
const verify = require('./verifyToken');

const Item = require('../model/Item');

router.get('/items', verify, (req, res) => {
    Item.find((err, result) =>{
        if(err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.send(result);
        }
    })
})

router.get('/item/:itemId', verify, (req, res) => {
    const {itemId} = req.params;
    Item.find({_id: itemId}, (err, result) =>{
        if(err) {
            res.send(err.message);
        } else {
            res.send(result[0]);
        }
    })
})

module.exports = router;