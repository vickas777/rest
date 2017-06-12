'use strict';

const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.json({msg: 'Welcome to API'});
});


module.exports = router;