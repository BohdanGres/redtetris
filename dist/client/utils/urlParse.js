"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _cookie = require("./cookie");

var _socket = _interopRequireDefault(require("./socket"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default() {
  if (window.location.hash) {
    var href = window.location.hash;
    var start = href.indexOf('[');
    var end = href.lastIndexOf(']');

    if (start === end) {
      window.location.hash = '';
      return;
    }

    var roomName = href.slice(start + 1, end);
    var userName = href.slice(1, start);

    if (!roomName || !userName) {
      window.location.hash = '';
      return;
    }

    if ((0, _cookie.getCookie)('userName') !== userName) {
      (0, _cookie.setCookie)('userName', userName);
      (0, _cookie.setCookie)('uuid', '');
    } else {
      _socket["default"].emit('urlCreate', {
        roomName: roomName,
        playerId: (0, _cookie.getCookie)('uuid')
      });
    }

    window.location.hash = '';
  }
}