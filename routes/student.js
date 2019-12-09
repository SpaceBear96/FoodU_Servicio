var express = require("express");
var models = require("../models");
const index = require('../config/index');
var enigma = require('enigma-code');
var router = express.Router();

router.get("/", function(req, res) {
  models.student.findAll().then(users => {
    res.json(users);
  });
});

router.post("/create", function(req, res) {
  
});

router.get("/view/:id", function(req, res) {
  var id = req.param("id");
  models.student
    .findAll({
      where: {
        StudentID: id
      }
    })
    .then(users => {
      res.json(users);
    });
});

router.post("/edit", function(req, res) {
  const { code, name, lsname, type } = req.body;
  models.student
    .update(
      {
        StudentName: name,
        StudentLsname: lsname,
        StudentType: type,
        updatedAt: Date.now()
      },
      {
        where: {
          StudentID: code
        }
      }
    )
    .then(() => {
      console.log("Done");
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
