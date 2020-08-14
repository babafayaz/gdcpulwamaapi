const express = require("express");
let router = express.Router();
var db = require('../db/db');
const { Router } = require("express");


//login api
router.route('/')
.post(function (req, res) {  
  
            const USER= [req.body.username];
            const PWD = [req.body.pwd];
            
            
let sql = "SELECT * FROM user_tbl WHERE username = '"+ USER +"' && password = '"+PWD+"'";
 db.query(sql,(err, results) => {
  if (err){
            res.status(500).send(err);
            res.json({"msg": "iNALID lOGIN"})
            return;
          }
    else
    {
        if(results.length){
            res.status(200);
            res.json({"msg": "Valid user name and password "})
            res.redirect('/');
         }
         else
         {
             res.json({"msg": "invalid Credientials"})
         }
    }
 
  }); 
})

module.exports = router;
