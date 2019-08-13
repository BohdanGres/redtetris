"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Socket =
/*#__PURE__*/
function () {
  function Socket() {
    _classCallCheck(this, Socket);
  }

  _createClass(Socket, [{
    key: "init",
    value: function init(app) {
      this.io = require('socket.io')(app);
    }
  }, {
    key: "close",
    value: function close() {
      this.io.close();
    }
  }, {
    key: "on",
    value: function on(event, cb) {
      this.io.on(event, cb);
    }
  }, {
    key: "emit",
    value: function emit(event, data, to) {
      if (to) {
        this.io.to(to).emit(event, data);
      } else {
        this.io.emit(event, data);
      }
    }
  }, {
    key: "sendToRoom",
    value: function sendToRoom(name, data) {
      var _this = this;

      this.io.of('/')["in"](name).clients(function (error, socketIds) {
        if (error) throw error;
        console.log('socketIds', socketIds);
        socketIds.forEach(function (socketId) {
          return _this.io.sockets.sockets[socketId].emit('action', _objectSpread({}, data));
        });
      });
    }
  }, {
    key: "clearRoom",
    value: function clearRoom(name) {
      var _this2 = this;

      this.io.of('/')["in"](name).clients(function (error, socketIds) {
        if (error) throw error;
        socketIds.forEach(function (socketId) {
          return _this2.io.sockets.sockets[socketId].leave(name);
        });
      });
    }
  }, {
    key: "removePlayerFromRoom",
    value: function removePlayerFromRoom(id, name) {
      this.io.sockets.sockets[id].leave(name);
    }
  }]);

  return Socket;
}();

var socket = new Socket();
var _default = socket;
exports["default"] = _default;