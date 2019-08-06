"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pageChange = exports.PAGE_CHANGE = void 0;
var PAGE_CHANGE = 'PAGE_CHANGE';
exports.PAGE_CHANGE = PAGE_CHANGE;

var pageChange = function pageChange(page) {
  return {
    type: PAGE_CHANGE,
    page: page
  };
};

exports.pageChange = pageChange;