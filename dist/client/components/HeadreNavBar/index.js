"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _store = _interopRequireDefault(require("./../../utils/store"));

var _pageChange = require("./../../actions/pageChange");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var HeaderNavBar = function HeaderNavBar() {
  var handleClick1 = function handleClick1(e) {
    _store["default"].dispatch((0, _pageChange.pageChange)('home'));
  };

  var handleClick2 = function handleClick2(e) {
    _store["default"].dispatch((0, _pageChange.pageChange)('game_rooms'));
  };

  var handleClick3 = function handleClick3(e) {
    _store["default"].dispatch((0, _pageChange.pageChange)('user_scores'));
  };

  return _react["default"].createElement(_List["default"], {
    component: "nav"
  }, _react["default"].createElement(_ListItem["default"], {
    component: "div"
  }, _react["default"].createElement(_ListItemText["default"], {
    inset: true
  }, _react["default"].createElement(_Button["default"], {
    variant: "outlined",
    value: "home",
    onClick: handleClick1
  }, "Main Page")), _react["default"].createElement(_ListItemText["default"], {
    inset: true
  }, _react["default"].createElement(_Button["default"], {
    variant: "outlined",
    value: "game_rooms",
    onClick: handleClick2
  }, "Game rooms")), _react["default"].createElement(_ListItemText["default"], {
    inset: true
  }, _react["default"].createElement(_Button["default"], {
    variant: "outlined",
    value: "user_scores",
    onClick: handleClick3
  }, "Users"))));
};

var _default = HeaderNavBar;
exports["default"] = _default;