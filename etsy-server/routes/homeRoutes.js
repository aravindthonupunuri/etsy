const router = require('express').Router();
const { connection } = require('../dbConfig');
const verify = require('./verifyToken');

// router.get('/items', verify, (req, res) => {
//     connection.query(
//         "SELECT * FROM Items" , (err, result) =>{
//             if(err) {
//                 console.log(err);
//             } else {
//                 res.send(result);
//             }
//         }
//     )
// })

router.get('/items', (req, res) => {
    // console.log("in home items")
    connection.query(
        "SELECT * FROM Items" , (err, result) =>{
            if(err) {
                // console.log(err);
            } else {
                // console.log("success home items")
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
                // console.log(err);
                res.send(err.message);
            } else {
                res.send(result[0]);
            }
        }
    )
})

module.exports = router;