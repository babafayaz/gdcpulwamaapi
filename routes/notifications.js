const express = require("express");
let router = express.Router();
var db = require('../db/db');

router.route('/notification')
  .get(function (req, res) {
    db.query('SELECT * FROM notification ORDER BY id desc', (err, result) => {
        if (err){
            console.log("error: ", err);
            
            return;
          }
       
        res.send(result);
      });

  })
  .post(function (req, res) {
   
    let data = {
      title : req.body.title,
       filename : req.body.filename, 
       link: req.body.link,
       pubdate: req.body.pubdate,
       category: req.body.category, 
       discription: req.body.discription,
       isactive: req.body.isactive, 
       notificationtype: req.body.notificationtype
      };
    let sql = "INSERT INTO notification SET ?";
     db.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send("one recored addedd")
    });
    
  
});

module.exports = router;
