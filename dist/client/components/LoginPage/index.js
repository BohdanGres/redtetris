"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import 'index.css';
// import { Row } from './../Row/index';
var buildRow = function buildRow(height, width, color) {
  var row = [];

  for (var i = 0; i < height; i++) {
    row.push(_react["default"].createElement(Row, {
      key: i,
      width: width,
      color: color[i]
    }));
  }

  return row;
};

var BoardMain = function BoardMain(_ref) {
  var width = _ref.width,
      height = _ref.height,
      array = _ref.array;
  return _react["default"].createElement("div", {
    className: "mainBoard"
  }, buildRow(height, width, array));
};

var mapStateToProps = function mapStateToProps(state) {
  return state;
};

var _default = (0, _reactRedux.connect)(mapStateToProps, null)(BoardMain);

exports["default"] = _default;