"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _HeadreNavBar = _interopRequireDefault(require("./../HeadreNavBar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Header = function Header() {
  return _react["default"].createElement("div", null, _react["default"].createElement(_AppBar["default"], {
    color: "primary",
    position: "static"
  }, _react["default"].createElement(_Toolbar["default"], null, _react["default"].createElement(_Typography["default"]
  /*variant="button"*/
  , {
    variant: "h2",
    color: "inherit"
  }, "RED TETRIS"), _react["default"].createElement(_HeadreNavBar["default"], null))));
};

var _default = Header;
exports["default"] = _default;