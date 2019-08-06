"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Board = exports.Tetris = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Tetris = function Tetris() {
  return _react["default"].createElement(Board, null);
};

exports.Tetris = Tetris;

var Board = function Board() {
  return _react["default"].createElement("div", null);
};

exports.Board = Board;