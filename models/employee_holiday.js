'use strict';

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConfigSchema = new Schema({
  name:     { type: String },
  holidays: [{ type: Date }]
});

module.exports = mongoose.model('Config', ConfigSchema);
