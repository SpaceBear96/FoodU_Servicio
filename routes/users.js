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

  if (verificar(mail, rol)) {
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
  } else {
    res.send(false);
  }
});

router.get("/disconnect", function(req, res) {
  console.log(req.session.id);
  req.session.id = "";
  res.send(true);
});

router.post("/list", (req, res) => {
  const rol = req.body.rol;

  models.user
    .findAll({
      where: {
        Roles_ID: parseInt(rol)
      }
    })
    .then(acc => {
      res.json(acc);
    });
});

function verificar(email, role) {
  models.user
    .findAll({
      where: {
        Email: email
      }
    })
    .then(user => {
      if (user) {
        console.log("Tiene datos");
        console.log("ID registrado " + user[0].Roles_ID);
        console.log("ID por registrar " + role);
        return verificar_rol(user[0].ID, user[0].Roles_ID, role) ? false : true;
      } else {
        console.log("No tiene datos");
        return true;
      }
    });
}

function verificar_rol(id, rol1, rol2) {
  //1:Vendedor,2:Cliente,3:Ambos
  if (rol1 != 3 && rol2 != 3) {
    if (rol1 == rol2) {
      console.log("Los roles se repiten");
      return false;
    } else {
      update(id, 3)
        ? console.log("Rol actualizado correctamente")
        : console.log("Fallo en la actualización");
      return true;
    }
  }
}

function update(id_, rol) {
  models.user.update({ Roles_ID: rol,updateAt: Date.now() }, { where: { ID: id_ } }).then(x => {
    return true;
  });
}

module.exports = router;
