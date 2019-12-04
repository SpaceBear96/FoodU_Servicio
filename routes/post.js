var express = require('express');
var models  = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
  models.post.findAll({
    include:[{
      model:models.food
    }]
  }).then(posts => {
    res.json(posts);
  });
});

router.post('/create',function(req,res){
  const { title, descr, fd } = req.body
  models.post.create({
      pst_title: title,
      pst_descr: descr,
      fd_code: fd,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }).then(pst=> {
    res.json({
        status: "ok",
        operation: "create",
        id: pst.pst_code,
    });
  });
});

router.get('/view/:id',function(req,res){
    var id = req.param('id');
    models.post.findAll({
        include:[{
          model:models.food
        }]
        ,
        where: {
            pst_code:id
          }
    }
      ).then(posts => {
        res.json(posts);
      });
});

router.post('/edit',function(req,res){

    const { code, title, descr, fd } = req.body    
  
  models.post.update({
      pst_title: title,
      pst_descr: descr,
      fd_code: fd,
      updatedAt: Date.now()
  }, {  where: {
        pst_code: code
    }}).then(() => {
    console.log("Done");
  }).catch(err => {
      console.log(err)
  });
});

module.exports = router;
