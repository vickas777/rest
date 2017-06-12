'use strict';

const utils = {};

/**
 * Create UTC date from parameter
 * @param date {string | Object | number} - date
 * @returns {Date} - UTC date
 */
utils.createDateAsUTC = function (date = Date.now()) {
  date = new Date(date);
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  );
};

module.exports = utils;

