var express = require("express");
var models = require("../models");

var router = express.Router();

router.get("/",function(req,res){
    models.university.findAll().then(uni =>{
        res.json(uni)
    });
});

module.exports = router;