var express = require('express');
var models  = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
  models.post.findAll({
    include:[{
      model:models.food
    }]
  }).then(posts => {
    console.log(posts.PostID);
    res.json(posts);
  });
});

router.post('/create',function(req,res){
  const { title, descr, fd } = req.body
  models.post.create({
      PostTitle: title,
      PostDescr: descr,
      FoodID: fd,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }).then(pst=> {
    res.json({
        status: "ok",
        operation: "create",
        id: pst.PostID,
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
            PostID:id
          }
    }
      ).then(posts => {
        res.json(posts);
      });
});

router.post('/edit',function(req,res){

    const { code, title, descr, fd } = req.body    
  
  models.post.update({
      PostTitle: title,
      PostDescr: descr,
      FoodID: fd,
      updatedAt: Date.now()
  }, {  where: {
        PostID: code
    }}).then(() => {
    console.log("Done");
  }).catch(err => {
      console.log(err)
  });
});

module.exports = router;
