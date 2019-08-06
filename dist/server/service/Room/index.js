"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Create = _interopRequireDefault(require("./Create"));

var _List = _interopRequireDefault(require("./List"));

var _Delete = _interopRequireDefault(require("./Delete"));

var _Subscriber = _interopRequireDefault(require("./Subscriber"));

var _UrlCreate = _interopRequireDefault(require("./UrlCreate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  Create: _Create["default"],
  List: _List["default"],
  Delete: _Delete["default"],
  Subscriber: _Subscriber["default"],
  UrlCreate: _UrlCreate["default"]
};
exports["default"] = _default;