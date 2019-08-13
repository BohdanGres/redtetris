"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cell = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cells = [];

var createCell = function createCell(amount) {
  for (var i = 0; i < amount; i++) {
    cells.push(_react["default"].createElement("div", {
      className: "cell",
      onClick: test
    }));
  }
};

createCell();

function test(e) {
  alert(123);
}

;

var Cell = function Cell() {
  return _react["default"].createElement("div", {
    onClick: test
  });
};

exports.Cell = Cell;