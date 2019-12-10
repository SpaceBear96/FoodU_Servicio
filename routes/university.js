var express = require('express');
var models = require('../models');
var aws = require('../libs/aws-s3');
var router = express.Router();
const index = require('../config/index');
const NEW_BUCKET_NAME = index.aws.s3.BUCKET_NAME + '/Comida'; 

router.get('/', function (req, res) {
  models.university.findAll({
  }).then(uni => {
    res.json(uni);
  });
});

module.exports = router;  