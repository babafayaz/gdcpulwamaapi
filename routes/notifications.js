const express = require("express");
let router = express.Router();
var db = require('../db/db');
let path = require('path');
const { request } = require("http");
router.route('/notification')
  .get(function (req, res) {
    db.query('SELECT * FROM notification ORDER BY pubdate desc', (err, result) => {
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
    
  
})

router.route('/download/:id')
  .get(function (req, res) {
    let id=[req.params.id]
    db.query('SELECT filename FROM notification WHERE id = ? ',id ,(err, result) => {
      if (err){
          console.log("error: ", err);
          
          return;
        }

        //res.status(200).send(result);
       
        res.download(path.join(__dirname, '../attachments/123.pdf'), (err)=>{
        console.log(err);
        console.log('Your file has been downloaded!')
        });
       
    });
   // res.status(200).send({fn}),


});
 

module.exports = router;
