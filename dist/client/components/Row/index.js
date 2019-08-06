"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Row = void 0;

var _react = _interopRequireDefault(require("react"));

var _configUi = _interopRequireDefault(require("../../../../etc/config-ui"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createCell = function createCell(row) {
  var cells = row.map(function (cel, i) {
    return _react["default"].createElement("div", {
      key: i,
      className: "cell",
      style: {
        backgroundColor: _configUi["default"].colorValue[cel]
      }
    });
  });
  return cells;
};

var Row = function Row(_ref) {
  var row = _ref.row;
  return _react["default"].createElement("div", {
    className: "row"
  }, createCell(row));
};

exports.Row = Row;