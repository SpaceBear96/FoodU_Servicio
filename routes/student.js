var express = require("express");
var models = require("../models");
var router = express.Router();

router.get("/", function(req, res) {
  models.student.findAll().then(users => {
    res.json(users);
  });
});

router.post("/create", function(req, res) {
  const { name, lsname, type } = req.body;
  models.student
    .create({
      StudentName: name,
      StudentLsname: lsname,
      StudentType: type,
      createdAt: Date.now(),
      updatedAt: Date.now()
    })
    .then(stu => {
      res.json({
        status: "ok",
        operation: "create",
        id: stu.StudentID
      });
    });
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
