'use strict';
if ( !process.env.SETTINGS ) {
  console.error('No $SETTINGS env variable present');
  process.exit(1);
}

const settings = require(process.env.SETTINGS);

const express = require('express');
const app = express();
const port = settings.portRest;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// register models
require('./models/bank_holiday');
require('./models/employee_holiday');

const main = require('./routes/index');
const config = require('./routes/config');
const holidays = require('./routes/holidays');

mongoose.Promise = global.Promise;
mongoose.connect(settings.mongoURL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', main);
app.use('/api/v1/config', config);
app.use('/api/v1/holidays', holidays);

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  
  // send error message
  res.status(err.status || 500);
  res.json({err: err.message});
});


app.listen(port, function () {
  console.log(`Start listening REST API on port ${port}`);
});