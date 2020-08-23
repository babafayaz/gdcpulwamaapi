const express = require("express");
let router = express.Router();
var db = require('../db/db');
const jwt = require("jsonwebtoken");
const jwtKey = "sdaasfafafafeqqfafasfaff";
const jwtExpirySeconds = 300;

//login api
router.route('/')
.post( (req, res)=> {  
  
            const USER= [req.body.username];
            const PWD = [req.body.password];
           // console.log(USER, PWD)
let sql = "SELECT username FROM user_tbl WHERE username = '"+ USER +"' && password = '"+PWD+"'";
 db.query(sql,(err, results) => {
        if(results.length){                
                 const token = jwt.sign({USER}, jwtKey, {
                 algorithm: "HS256",
                 expiresIn: jwtExpirySeconds,
           });                    
            // set the cookie as the token string, with a similar max age as the token
            // here, the max age is in milliseconds, so we multiply by 1000
           
            res.cookie("token", token, { maxAge: jwtExpirySeconds * 100 }).status(200).json({"login":"success", "Token":token}) 
            
            return
            
         }
         else
         {
            res.status(401); 
            return res.send({"login": "fail", "msg": "invalid Credientials"})
         }
 
        
  })
 
 

})

module.exports = router;
