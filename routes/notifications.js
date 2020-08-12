const express = require("express");
let router = express.Router();
var db = require('../db/db');
const { response } = require("express");

router.route('/notification')
  .get(function (req, res) {
    db.query('SELECT * FROM notification', (err, result) => {
        if (err){
            console.log("error: ", err);
            result(err, null);
            return;
          }
       
        res.send(result);
      });

  })
  .post(function (req, res) {
    res.json({ message: "Welcome to GDC API Post." });
  })
 

module.exports = router;
