"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _simpleNodeLogger = _interopRequireDefault(require("simple-node-logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var opts = {
  logFilePath: 'error-log.log',
  timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
};

var log = _simpleNodeLogger["default"].createSimpleLogger(opts);

var _default = log;
exports["default"] = _default;