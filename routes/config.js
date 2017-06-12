'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Config = mongoose.model('Config');
const Dates = require('date-math');
const utils = require('../libs/utils');
const createDateAsUTC = utils.createDateAsUTC;

router.get('/', function (req, res, next) {
  res.json({ msg: 'Welcome to config API ;)' });
});

router.get('/:name', function (req, res, next) {
  const now = new Date();
  const name = req.params.name;
  
  const dateFrom = req.query.dateFrom ? createDateAsUTC(req.query.dateFrom) : Dates.month.floor(now);
  const dateTo = req.query.dateTo ? createDateAsUTC(req.query.dateTo) : Dates.month.shift(dateFrom, 1);
  
  const holidayFilter = day => createDateAsUTC(day) >= dateFrom && createDateAsUTC(day) <= dateTo;
  
  Config.findOne({ name: name }, function (err, config) {
    if ( err ) {
      console.error(err);
      next(err);
      return;
    }
    
    if ( !config ) {
      res.json({ err: 'No such name!' });
      return;
    }
    
    const response = {}
    response.holidays = config.holidays.filter(holidayFilter);
    response.name = config.name;
    response.period = {
      from: dateFrom,
      to:   dateTo
    }
    
    res.json({ result: response});
  });
});

module.exports = router;