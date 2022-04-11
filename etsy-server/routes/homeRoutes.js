const router = require('express').Router();
const verify = require('./verifyToken');
const { checkAuth } = require("../Utils/passport");
const passport = require('passport');
require('../Utils/passport')
router.use(passport.initialize());

const Item = require('../model/Item');
// const passport = require('passport');

router.get('/items', passport.authenticate('jwt', {session: false}), (req, res) => {
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