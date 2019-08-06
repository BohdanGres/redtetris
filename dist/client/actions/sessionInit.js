"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sessionInit = exports.SESSION_INIT = void 0;
var SESSION_INIT = 'SESSION_INIT';
exports.SESSION_INIT = SESSION_INIT;

var sessionInit = function sessionInit(roomPending) {
  return {
    type: SESSION_INIT,
    roomPending: roomPending
  };
};

exports.sessionInit = sessionInit;