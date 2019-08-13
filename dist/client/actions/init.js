"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = exports.INIT_TYPE = void 0;
var INIT_TYPE = 'INIT_TYPE';
exports.INIT_TYPE = INIT_TYPE;

var init = function init(body) {
  return {
    type: INIT_TYPE,
    body: body
  };
};

exports.init = init;