var express = require("express");
var models = require("../models");
const index = require("../config/index");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var router = express.Router();

router.post("/login", function (req, res) {
  const { Email, Password } = req.body;

  models.user.findOne(
    { where: { Email: Email } })
    .then(usuario => {
      if (!usuario) return res.status(404).json({ message: 'EL USUARIO NO EXISTE' });
      bcrypt.compare(Password, usuario.Password).then(match => {
        if (match) {
          usuario.Password = null;
          payload = { usuario }
          jwt.sign(payload, index.bcrypt.key, function (error, token) {
            if (error) {
              res.status(500).json({ error });
            } else {
              usuario.token = token;
              res.status(200).json({
                ID: usuario.ID,
                Name: usuario.Name,
                LastName: usuario.LastName,
                Email: usuario.Email,
                Token: token,
                Role: usuario.Roles_ID,
                Universities_ID: usuario.Universities_ID
              });
            }
          })
        } else {
          res.status(200).json({ message: 'PASSWORD INCORRECTA' });
        }
      });
    });
});

// router.get("/favorites/:id",(req,res)=>{
//     id = parseInt(req.params.id);
//     data = [];
//     models.favorite
//     .findAll({
//       where: {
//             User_ID:id
//       }
//     })
//     .then(user => {
//         user.forEach(item =>{
//           models.food.findAll({
//           where:{
//             Users_ID:item.id
//           }
//           }).then(fd =>{
//             data.push(fd);
//             console.log(data);
//           }).catch(err => {
//             console.log(err);
//             res.json(err);
//           });
//         });
//     })
//     .catch(err => {
//       console.log(err);
//       res.json(err);
//     });
// })

router.post("/create", (req, res) => {
  const { Name, LastName, Role, Email, Password, University } = req.body;

  bcrypt.genSalt(10).then(salts => {
    bcrypt.hash(Password, salts).then(hash => {
      // verificar(Email,Role,hash);
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
    })
  });
});

router.get("/listBuyers/:id", (req, res) => {
  const { id } = req.params
  models.user
    .findAll({
      where: {
        Roles_ID: {
          [models.Sequelize.Op.in]: ['1', '3']
        },
        Universities_ID: id
      },
      include: [
        {
          model: models.roles,
          attributes: ['ID', 'Name']
        },
        { model: models.university }
      ]
    })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

// function verificar(email, role,pass) {
//   models.user
//     .findOne({
//       where: {
//         Email: email
//       }
//     })
//     .then(user => {

//         bcrypt.compare(pass, user.Password).then(match => {
//             if (user != "") {
//               console.log("Tiene datos");
//               console.log("ID registrado " + user.Roles_ID);
//               console.log("ID por registrar " + role);
//               return verificar_rol(user.ID, user.Roles_ID, role) ? false : true;
//             } else {
//               console.log("No tiene datos");
//               return true;
//             }
//         }).catch(e)=>{
//           console.log(e);
//         };
//     });
// }

// function verificar_rol(id, rol1, rol2) {
//   //1:Vendedor,2:Cliente,3:Ambos
//   if (rol1 != 3 && rol2 != 3) {
//     if (rol1 == rol2) {
//       console.log("Los roles se repiten");
//       return false;
//     } else {
//       update(id, 3)
//         ? console.log("Rol actualizado correctamente")
//         : console.log("Fallo en la actualización");
//       return true;
//     }
//   }
// }

// function update(id_, rol) {
//   models.user.update({ Roles_ID: rol, updateAt: Date.now() }, { where: { ID: id_ } }).then(x => {
//     return true;
//   });
// }

module.exports = router;
