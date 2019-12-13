var express = require("express");
var models = require("../models");
var crypto = require("crypto");
const index = require("../config/index");
var router = express.Router();

router.get("/completas", function(req, res) {
  models.sale
    .findAll({
      where: { State: true },
      include: [
        {
          model: models.food
        },
        {
          model: models.place
        },
        {
          model: models.user
        }
      ]
    })
    .then(orders => {
      res.json(orders);
    });
});
router.get("/pendientes", function(req, res) {
  models.sale
    .findAll({
      where: { State: false },
      include: [
        {
          model: models.food
        },
        {
          model: models.place
        },
        {
          model: models.user
        }
      ]
    })
    .then(orders => {
      res.json(orders);
    });
});

router.post("/create", function(req, res) {
  const { Quantity, Food, Place, User } = req.body;
  //Generación del codigo de 6 dígitos
  var pin = GenCodigo();
  console.log(pin);
  console.log(req.body);
  models.sale
    .create({
      Price: parseFloat(Food.Price),
      Code: pin,
      State: true,
      Quantity: parseInt(Quantity),
      Food_ID: parseInt(Food.ID),
      Places_ID: parseInt(Place.ID),
      Users_ID: parseInt(User.ID)
    })
    .then(pst => {
      res.json({
        status: "ok",
        operation: "create",
        id: pst.ID
      });
    }).catch(error => {
      res.json(error)
    });
});

router.post("/verificar", function(req, res) {
  let code = req.body.Code;
  models.sale
    .findOne({
      where: { Code: code },
      include: [
        { model: models.food },
        { model: models.place },
        { model: models.user }
      ]
    })
    .then(sale => {
      res.json(sale);
    });
});

router.post("/confirmar", function(req, res) {
  let code = req.body.Code;
  models.sale
    .findOne({
      where: { Code: code },
      include: [
        { model: models.food },
        { model: models.place },
        { model: models.user }
      ]
    })
    .then(sale => {
      sale.State = true;
      models.sale.update(sale, { where: { ID: sale.ID } }).then(x => {
        res.json(x);
      });
    });
});

function GenCodigo() {
  num = Math.random();
  lu = num * Math.pow(10, 6);
  fin = Math.trunc(lu);
  return fin;
}
module.exports = router;
