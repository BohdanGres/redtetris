"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ping = void 0;

var ping = function ping() {
  return {
    type: 'server/ping'
  };
};

exports.ping = ping;