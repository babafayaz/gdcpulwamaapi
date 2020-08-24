const express = require("express");
let router = express.Router();
var db = require('../db/db');
let path = require('path');
const { request } = require("http");


//requestes on /notification/:category
router.route('/notification/:category')
  .get(function (req, res) {                       //notification get request depending on category
      const cat=[req.params.category]
      db.query(`SELECT * FROM notification WHERE category= ? && isactive= 1 ORDER BY pubdate desc`,cat, (err, result) => {
          if (err){
              res.status(500).send(err);
              return;
            }
          res.send(result);
        });
  })
  //notification post
  .post(function (req, res) {  
      let data = {
                    title : req.body.title,
                    filename : req.body.filename2, 
                    link: req.body.link,
                    pubdate: req.body.pubdate,
                    category: req.body.category, 
                    discription: req.body.discription,
                    isactive: req.body.isactive, 
                    notificationtype: req.body.notificationtype
                  };
                  
    let sql = "INSERT INTO notification SET ?";
     db.query(sql, data,(err, results) => {
      if (err){
                res.status(500).send(err);
                return;
              }
      res.status(200).json({"flag": "success"})
      }); 
})
//api for downloading the pdf files /notifications on id passed as params
router.route('/download/:id')
  .get(function (req, res) {
            let id=[req.params.id]
           let resultsql= db.query('SELECT filename FROM notification WHERE id = ? ',id ,(err, result) => {
              console.log(resultsql)
              if (err){
                res.status(500).send(err);
                return;
                }
                //res.status(200).send(result);       
                res.download(path.join(__dirname, '../attachments/' + id +".pdf"), (err)=>{
                  if (err){
                            res.status(500).send(err);
                            return;
                          }
                });              
            });
          // res.status(200).send({fn}),
});


module.exports = router;

