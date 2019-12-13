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
router.get('/:id', function (req, res) {
  id = req.params.id;
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
router.get('/list/:id',function(req,res){
  id = req.params.id;
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
  models.food.findOne({
    where:{
      ID:id
    }
  }).then(comida => {
    res.json(comida);
  });

});


router.post('/create', function (req, res) {
  const { Nombre, Descripcion, Precio,Stock,User,Img } = req.body    
  try {
    // var nm = aws.putObject(NEW_BUCKET_NAME, documento);
    // console.log("Posiblenombre : "+nm);
    
    models.food.create({
        Name: Nombre,
        Description: Descripcion,
        Price: Precio,
        Stock: Stock,
        Users_ID: User,
        State:1,
        Image: Img,
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