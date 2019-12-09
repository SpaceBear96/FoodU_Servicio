var express = require("express");
var models = require("../models");
const index = require("../config/index");
var router = express.Router();
var enigma = require("enigma-code");

router.post("/login", function(req, res) {
  const { mail, pass } = req.body;
  var vPass;
  console.log(req.body);
  console.log("========");
  console.log(mail);
  console.log(pass);
  console.log("========");

  enigma.genHash(index.enigma.vEncrip, index.enigma.key, pass, function(
    err,
    hash
  ) {
    if (err) return console.log(err); //Solo se ejecutara si existe un error
    vPass = hash; //2dl3lkwkj13kj12k12kj321kj
    //esa funcion retorna por defecto en hash la contraseña encriptada
  });

  models.user
    .findAll({
      where: {
        Email: mail,
        Password: vPass
      }
    })
    .then(acc => {
      req.session.id = parseInt(acc[0].ID);
      req.session.mail = acc[0].Email;

      console.log(req.session);
      console.log("-----------------");
      res.send(true);
    });
});

router.post("/create", (req, res) => {
  const { name, lsname, rol, mail, pass, uni } = req.body;
  var vPass = "";
  enigma.genHash(index.enigma.vEncrip, index.enigma.key, pass, function(
    err,
    hash
  ) {
    if (err) return console.log(err); //Solo se ejecutara si existe un error
    vPass = hash;
    console.log(hash); //2dl3lkwkj13kj12k12kj321kj
    //esa funcion retorna por defecto en hash la contraseña encriptada
  });
  try {
    models.user
      .create({
        Name: name,
        LastName: lsname,
        Roles_ID: rol,
        Email: mail,
        Password: vPass,
        Universities_ID: uni
      })
      .then(acc => {
        req.session.id = acc.ID;
        res.json({
          status: "ok",
          operation: "create",
          id: acc.ID
        });
      });
  } catch (e) {
    console.log(e);
  }
});

router.get("/disconnect", function(req, res) {
  console.log(req.session.id);
  req.session.id = "";
  res.send(true);
});

module.exports = router;
