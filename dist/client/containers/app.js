"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _BoardMain = _interopRequireDefault(require("./../components/BoardMain"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var App = function App() {
  return _react["default"].createElement(_BoardMain["default"], null);
};

var _default = App;
exports["default"] = _default;