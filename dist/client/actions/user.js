"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.users = exports.USER_LIST = void 0;
var USER_LIST = 'USER_LIST';
exports.USER_LIST = USER_LIST;

var users = function users(_users) {
  return {
    type: USER_LIST,
    users: _users
  };
};

exports.users = users;