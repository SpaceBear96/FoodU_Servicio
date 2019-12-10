var express = require("express");
var models = require("../models");
const index = require("../config/index");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var router = express.Router();

router.post("/login", function(req, res) {
  const { Email, Password } = req.body;

  models.user.findOne(
    {where:{Email:Email}})
    .then(usuario => {
    if(!usuario) return res.status(404).json({message: 'EL USUARIO NO EXISTE'});
    bcrypt.compare(Password,usuario.Password).then(match => {
      if(match){
        usuario.Password = null;
        payload = {usuario}
        jwt.sign(payload,index.bcrypt.key,function(error,token){
            if(error){
                res.status(500).json({error});
            }else{
              usuario.token = token;
              res.status(200).json({
                Name:usuario.Name,
                LastName:usuario.LastName,
                Email:usuario.Email,
                Token : token,
                Role : usuario.Roles_ID,
                Universities_ID : usuario.Universities_ID
              });
            }
        })
    }else{
        res.status(200).json({message: 'PASSWORD INCORRECTA'});
    }
    });
  });
});

router.post("/create", (req, res) => {
  const { Name, LastName, Role, Email, Password, University } = req.body;
  bcrypt.genSalt(10).then(salts => {
    bcrypt.hash(Password,salts).then(hash => {
        try {
          models.user
            .create({
              Name: Name,
              LastName: LastName,
              Roles_ID: Role.ID, 
              Email: Email,
              Password: hash,
              Universities_ID: University.ID
            })
            .then(usr => {
              res.status(200).json(usr);
            });
        } catch (e) {
          console.log(e)
        }
    }).catch(error => {
      res.json(error)
    });
});
});
module.exports = router;
