var express = require("express");
var models = require("../models");

var router = express.Router();

router.get("/",function(req,res){
    models.university.findAll().then(uni =>{
        res.json(uni)
    });
});

router.get("/places/:id",function(req,res){
	id = req.params.id;

	models.place.findAll({
		where:{
			Universities_ID: id
		}
	}).then(pl=>{
		res.json(pl);
	})
});

module.exports = router;
