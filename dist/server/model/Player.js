"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var gameSchema = new _mongoose["default"].Schema({
  playerId: {
    type: String,
    "default": ''
  },
  socketId: {
    type: String
  },
  name: {
    type: String
  },
  status: {
    type: String
  },
  score: {
    type: Number,
    "default": 0
  },
  password: {
    type: String
  }
});

var Player = _mongoose["default"].model('Player', gameSchema);

var _default = Player;
exports["default"] = _default;