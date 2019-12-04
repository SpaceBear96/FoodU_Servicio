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
      stu_name: name,
      stu_lsname: lsname,
      stu_type: type,
      createdAt: Date.now(),
      updatedAt: Date.now()
    })
    .then(stu => {
      res.json({
        status: "ok",
        operation: "create",
        id: stu.stu_code
      });
    });
});

router.get("/view/:id", function(req, res) {
  var id = req.param("id");
  models.student
    .findAll({
      where: {
        stu_code: id
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
        stu_name: name,
        stu_lsname: lsname,
        stu_type: type,
        updatedAt: Date.now()
      },
      {
        where: {
          stu_code: code
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
