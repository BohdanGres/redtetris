"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = exports.AUTH = void 0;
var AUTH = 'AUTH';
exports.AUTH = AUTH;

var auth = function auth(data) {
  return {
    type: AUTH,
    data: data
  };
};

exports.auth = auth;