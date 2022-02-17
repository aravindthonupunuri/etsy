const express = require("express");
// const app = express();
// import app from "../app.js";
// var app = require("../app");
var router = express.Router();

var connection = require("../pool.js");

// app.get("/", function (req, res) {
//   res.send("I am here");
// });

// router.get("/", function (req, res) {
//   res.send("I am here");
// });

// router.post("/test", (req, res) => res.send("post test"));

// router.post("/create/profile", (req, res) => {
//   const { name, emailId, password } = req.body;
//   console.log(req.body);

//   connection.query(
//     "INSERT INTO users (name, email_id, password) values (?,?,?)",
//     [name, emailId, password],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//         res.status(401).send(err.message);
//         // throw(err);
//       } else {
//         res.send("Values Inserted");
//       }
//     }
//   );
// });

module.exports = router;
