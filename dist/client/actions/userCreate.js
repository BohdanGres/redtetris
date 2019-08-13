"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userCreate = exports.USER_CREATE = void 0;
var USER_CREATE = 'USER_CREATE';
exports.USER_CREATE = USER_CREATE;

var userCreate = function userCreate(userData) {
  return {
    type: USER_CREATE,
    userData: userData
  };
};

exports.userCreate = userCreate;