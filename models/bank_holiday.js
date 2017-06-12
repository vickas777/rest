'use strict';

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HolidaysSchema = new Schema({
  country:  { type: String },
  holidays: [{ type: Date }]
});

module.exports = mongoose.model('Holidays', HolidaysSchema);

