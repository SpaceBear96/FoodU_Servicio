var express = require('express');
var models  = require('../models');
var crypto = require('crypto');
const index = require('../config/index');
var router = express.Router();

router.get('/', function(req, res) {
  models.sale.findAll({
    include:[
        {
            model:models.food,
        },
        {
            model:models.place, 
        },
        {
            model:models.user, 
        }
    ]
  }).then(orders => {
    res.json(orders);
  });
  
});

router.post('/create',function(req,res){  
  const { pre, cant , fd,pl,user } = req.body
  //Generación del codigo de 6 dígitos
    var pin = GenCodigo();
    console.log(pin);
  
  //encriptación
  models.sale.create({
      Price: parseFloat(pre),
      Code: pin,  
      State: true,
      Quantity: parseInt(cant),
      Food_ID: parseInt(fd),
      Places_ID: parseInt(pl),
      Users_ID:parseInt(user)
    }).then(pst=> {
    res.json({
        status: "ok",
        operation: "create",
        id: pst.PostID,
    });
  });
});

router.post('/verificar',function(req,res){  
  let code = req.body.Code
  models.sale.findOne({where:{Code:code},include:[{model:models.food,},{model:models.place, },{model:models.user, }
  ]})
  .then(sale => {
    sale.State = true;
    models.sale.update(sale,{where :{ID : sale.ID}}).then(x => {
      res.json(sale);
    })
  });
});

function GenCodigo(){
    num = Math.random();
    lu = num * (Math.pow(10,6));
    fin = Math.trunc(lu);
  return fin;
}
module.exports = router;
