const router = require('express').Router();
const verify = require('./verifyToken');
const passport = require('passport');
require('../Utils/passport')
router.use(passport.initialize());

const Item = require('../model/Item');

router.get('/items',  
(req, res, next) => {
    passport.authenticate('jwt', {session: false}
    , (err, user) => {
        if(!user) return res.status(400).send("rubbish");
        console.log(user)
        console.log("ppp")
        req.user = user
        next();
    }
    )
    (req, res); 
}
,
 (req, res) => {
    console.log("in home items")
    console.log(req.user)
    Item.find((err, result) => {
        if(err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.send(result);
        }
    })
}
)

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