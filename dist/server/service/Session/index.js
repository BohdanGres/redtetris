"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Create = _interopRequireDefault(require("./Create"));

var _Update = _interopRequireDefault(require("./Update"));

var _Show = _interopRequireDefault(require("./Show"));

var _Delete = _interopRequireDefault(require("./Delete"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  Create: _Create["default"],
  Update: _Update["default"],
  Show: _Show["default"],
  Delete: _Delete["default"]
};
exports["default"] = _default;