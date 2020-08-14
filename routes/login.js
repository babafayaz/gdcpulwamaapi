const express = require("express");
let router = express.Router();
var db = require('../db/db');
const { Router } = require("express");
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
                
                const token = jwt.sign({USER}, jwtKey, {
                algorithm: "HS256",
                expiresIn: jwtExpirySeconds,
            });
           
            // set the cookie as the token string, with a similar max age as the token
            // here, the max age is in milliseconds, so we multiply by 1000
            res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })
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
