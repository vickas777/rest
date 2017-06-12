'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Holidays = mongoose.model('Holidays');
const Dates = require('date-math');
const utils = require('../libs/utils');
const createDateAsUTC = utils.createDateAsUTC;

router.get('/', function (req, res, next) {
  res.json({ msg: 'Welcome to holiday API ;)' });
  
});

router.get('/:country', function (req, res, next) {
  const country = req.params.country;
  const dateFrom = req.query.dateFrom ? createDateAsUTC(req.query.dateFrom) : Dates.month.floor(now);
  const dateTo = req.query.dateTo ? createDateAsUTC(req.query.dateFrom) : Dates.month.shift(dateFrom, 1);
  const holidayFilter = day => createDateAsUTC(day) >= dateFrom && createDateAsUTC(day) <= dateTo;
  
  Holidays.findOne({ country: country }, function (err, country) {
    if ( err ) {
      console.error(err);
      next(err);
      return;
    }
    
    if ( !country ) {
      res.json({ err: 'No such country!' });
      return;
    }
    
    const response = {};
    response.holidays = country.holidays.filter(holidayFilter);
    response.country = country.country;
    res.json({ result: response });
  });
});

module.exports = router;
