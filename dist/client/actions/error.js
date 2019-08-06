"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.error = exports.ERROR = void 0;
var ERROR = 'ERROR';
exports.ERROR = ERROR;

var error = function error(_error) {
  return {
    type: ERROR,
    error: _error
  };
};

exports.error = error;