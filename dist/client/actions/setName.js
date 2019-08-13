"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setName = exports.SET_NAME = void 0;
var SET_NAME = 'SET_NAME';
exports.SET_NAME = SET_NAME;

var setName = function setName(name) {
  return {
    type: SET_NAME,
    name: name
  };
};

exports.setName = setName;