"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography/Typography"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var UserRow = function UserRow(_ref) {
  var name = _ref.name,
      score = _ref.score,
      i = _ref.i;
  return _react["default"].createElement(_ListItem["default"], {
    key: i
  }, _react["default"].createElement(_ListItemText["default"], {
    primary: "Name: ".concat(name)
  }), _react["default"].createElement(_Typography["default"], null, "Score: ".concat(score)));
};

var _default = UserRow;
exports["default"] = _default;