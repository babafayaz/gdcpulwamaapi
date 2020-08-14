const express = require("express");
let router = express.Router();
var db = require('../db/db');
const jwt = require("jsonwebtoken");
const jwtKey = "my_secret_key";
const jwtExpirySeconds = 300;

//login api
router.route('/')
.post(function (req, res) {  
  
            const USER= [req.body.username];
            const PWD = [req.body.pwd];
            
            
let sql = "SELECT * FROM user_tbl WHERE username = '"+ USER +"' && password = '"+PWD+"'";
 db.query(sql,(err, results) => {
  if (err){
            res.status(500).send(err);
            return;
          }
    else
    {
        if(results.length){
                
               
            res.status(200);
            res.json({"msg": "Token set"})
            res.end()
         }
         else
         {
            res.status(401); 
            res.json({"msg": "invalid Credientials"})
         }
    }
 
  }); 
})

module.exports = router;
