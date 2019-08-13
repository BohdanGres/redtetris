"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;

var _debug = _interopRequireDefault(require("debug"));

var _SocketRouter = _interopRequireDefault(require("./router/SocketRouter"));

var _RequestRouter = _interopRequireDefault(require("./router/RequestRouter"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _socket = _interopRequireDefault(require("./core/socket"));

var _EventRouter = require("./router/EventRouter");

var _gameContainer = _interopRequireDefault(require("./core/gameContainer"));

var _Piece = _interopRequireDefault(require("./model/Piece"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var logerror = (0, _debug["default"])('tetris:error'),
    loginfo = (0, _debug["default"])('tetris:info'); // mongoose.Promise = Promise;

_mongoose["default"].connect("mongodb://localhost/mongo42");

(0, _EventRouter.iniEventRouter)();

var initApp = function initApp(app, params, cb) {
  var host = params.host,
      port = params.port;
  app.on('request', _RequestRouter["default"]);
  app.listen({
    host: host,
    port: port
  }, function () {
    loginfo("tetris listen on ".concat(params.url));
    cb();
  });
};

var initEngine = function initEngine(io) {
  io.on('connection', _SocketRouter["default"]);
};

function create(params) {
  var promise = new Promise(function (resolve, reject) {
    var app = require('http').createServer();

    initApp(app, params, function () {
      var io = new require('socket.io')(app);

      _socket["default"].init(app);

      var stop = function stop(cb) {
        app.close(function () {
          app.unref();
        });
        loginfo("Engine stopped.");
        cb();
      };

      initEngine(_socket["default"]);
      resolve({
        stop: stop
      });
    });
  });
  return promise;
}