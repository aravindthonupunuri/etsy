const router = require('express').Router();
const { connection } = require('../dbconfig');

router.get('/items', (req, res) => {
    // const {shopname} = req.params;
    
    connection.query(
        "SELECT * FROM Items" , (err, result) =>{
            if(err) {
                console.log(err);
            } else {
                console.log("in get items")
                res.send(result);
            }
        }
    )
})

module.exports = router;