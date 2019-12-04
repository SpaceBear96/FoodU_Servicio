var express = require('express');
var models  = require('../models');
var enigma = require('enigma-code');
const index = require('../config/index');
var router = express.Router();

router.get('/', function(req, res) {
  models.order.findAll({
    include:[
        {
            model:models.post, 
        },
        {
            model:models.place, 
        },
        {
            model:models.student, 
        }
    ]
  }).then(orders => {
    res.json(orders);
  });
});

router.post('/create',function(req,res){  
  const { cant , pst , stu , pl } = req.body
  

  enigma.genHash(index.enigma.vEncrip,index.enigma.key,index.enigma.plate,function(err,hash){
    if(err) return console.log(err);
    console.log(hash)
    vCode = hash;
    });
  
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
  
  var pin = GenCodigo();
  console.log(pin);
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

function GenCodigo(){
    num = Math.random();
    lu = num * (Math.pow(10,6));
    fin = Math.trunc(lu);
  return fin;
}
module.exports = router;
