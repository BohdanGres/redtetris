"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _socket = _interopRequireDefault(require("./socket"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Res =
/*#__PURE__*/
function () {
  function Res(_ref) {
    var connectionType = _ref.connectionType,
        socket = _ref.socket;

    _classCallCheck(this, Res);

    this.connectionType = connectionType;
    this.socket = socket;
  }

  _createClass(Res, [{
    key: "send",
    value: function send(data) {
      if (this.connectionType === 'singleRequest') {
        this.singleRequest(data);
      } else if (this.connectionType === 'allRequest') {
        Res.allRequest(data);
      } else if (this.connectionType === 'roomRequest') {
        Res.roomRequest(data);
      }
    }
  }, {
    key: "sendError",
    value: function sendError(data) {
      if (this.socket.emit) {
        this.socket.emit('SERVER_ERROR', _objectSpread({}, data));
      }
    }
  }, {
    key: "singleRequest",
    value: function singleRequest(data) {
      this.socket.emit('action', _objectSpread({}, data));
    }
  }], [{
    key: "allRequest",
    value: function allRequest(data) {
      _socket["default"].io.emit('action', _objectSpread({}, data));
    }
  }, {
    key: "roomRequest",
    value: function roomRequest(data) {
      _socket["default"].io.to(data.gameId).emit('action', _objectSpread({}, data));
    }
  }]);

  return Res;
}();

exports["default"] = Res;