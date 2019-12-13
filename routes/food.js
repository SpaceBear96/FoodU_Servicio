var express = require('express');
var models = require('../models');
var aws = require('../libs/aws-s3');
var router = express.Router();
const index = require('../config/index');
const NEW_BUCKET_NAME = index.aws.s3.BUCKET_NAME + '/Comida'; 

router.get('/', function (req, res) {
  models.food.findAll({
    include:[{
      model:models.user
    }]
  }).then(comida => {
    res.json(comida);
  });
});
// Listado de comida por usuario
router.post('/', function (req, res) {
  id = req.body.id;
  models.food.findAll({
    include:[{
      model:models.user
    }],
    where:{
      Users_ID:id
    }
  }).then(comida => {
    res.json(comida);
  });
});

//Listado de comida para clientes (id = Universities_ID)
router.post('/list',function(req,res){
  id = req.body.id;
  models.food.findAll({
    include:[{
      model:models.user,
      where:{
        Universities_ID:id
      }
    }]
    
  }).then(comida => {
    res.json(comida);
  });

});

router.get('/view/:id',function(req,res){
  id = req.params.id;
  models.food.findAll({
    where:{
      ID:id
    }
  }).then(comida => {
    res.json(comida);
  });

});


router.post('/create', function (req, res) {
  const { documento } = req.files;
  const { name, descr, precio,stock,stu } = req.body    
  try {
    var nm = aws.putObject(NEW_BUCKET_NAME, documento);
    console.log("Posiblenombre : "+nm);
    
    models.food.create({
        Name: name,
        Description: descr,
        Price: precio,
        Stock: stock,
        Users_ID: stu,
        Image: nm,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }).then( fd => {
      res.json({
          status: "ok",
          operation: "create",
          id: fd.ID,
      });
    });


  } catch (err) {
    console.log(err)
  }
});

module.exports = router;  