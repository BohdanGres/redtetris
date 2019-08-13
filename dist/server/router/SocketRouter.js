"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = initRouter;

var _configBe = _interopRequireDefault(require("./../../../etc/config-be"));

var _service = _interopRequireDefault(require("./../service"));

var _serviceRuner = require("./../core/serviceRuner");

var _request = _interopRequireDefault(require("./../core/request"));

var _respons = _interopRequireDefault(require("./../core/respons"));

var _contextBuilder = _interopRequireDefault(require("../utils/contextBuilder"));

var _gameContainer = _interopRequireDefault(require("./../core/gameContainer"));

var _Subscriber = _interopRequireDefault(require("../service/Room/Subscriber"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function initRouter(socket) {
  var req = new _request["default"](socket); //const res = new Res({ connectionType: 'singleRequest', socket });

  socket.on('userCreate',
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_ref) {
      var password, name, res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              password = _ref.password, name = _ref.name;
              res = new _respons["default"]({
                connectionType: 'singleRequest',
                socket: socket
              });
              (0, _serviceRuner.makeServiceRunner)(_service["default"].Session.Create, {
                password: password,
                name: name
              }, {
                name: name,
                socketId: socket.id
              })({
                res: res,
                req: req
              });

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());
  socket.on('userCheck',
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(_ref3) {
      var password, name, res;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              password = _ref3.password, name = _ref3.name;
              res = new _respons["default"]({
                connectionType: 'singleRequest',
                socket: socket
              });
              (0, _serviceRuner.makeServiceRunner)(_service["default"].Session.Update, {
                password: password,
                name: name
              }, {
                name: name,
                socketId: socket.id
              })({
                res: res,
                req: req
              });

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref4.apply(this, arguments);
    };
  }());
  socket.on('roomCreate',
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(_ref5) {
      var userUuid, name, res;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              userUuid = _ref5.userUuid, name = _ref5.name;
              res = new _respons["default"]({
                connectionType: 'singleRequest',
                socket: socket
              });
              _context3.t0 = _serviceRuner.makeServiceRunner;
              _context3.t1 = _service["default"].Room.Create;
              _context3.t2 = {
                name: name
              };
              _context3.next = 7;
              return (0, _contextBuilder["default"])({
                userUuid: userUuid
              });

            case 7:
              _context3.t3 = _context3.sent;
              _context3.t4 = (0, _context3.t0)(_context3.t1, _context3.t2, _context3.t3);
              _context3.t5 = {
                res: res,
                req: req
              };
              (0, _context3.t4)(_context3.t5);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x3) {
      return _ref6.apply(this, arguments);
    };
  }());
  socket.on('roomList',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var res;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            res = new _respons["default"]({
              connectionType: 'singleRequest',
              socket: socket
            });
            (0, _serviceRuner.makeServiceRunner)(_service["default"].Room.List, {}, {})({
              res: res,
              req: req
            });

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  socket.on('initSession',
  /*#__PURE__*/
  function () {
    var _ref9 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(_ref8) {
      var userName, userUuid, res;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              userName = _ref8.userName, userUuid = _ref8.userUuid;
              res = new _respons["default"]({
                connectionType: 'singleRequest',
                socket: socket
              });
              (0, _serviceRuner.makeServiceRunner)(_service["default"].Session.Show, {
                userName: userName,
                userUuid: userUuid
              }, {
                userUuid: userUuid,
                socketId: socket.id
              })({
                res: res,
                req: req
              });

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x4) {
      return _ref9.apply(this, arguments);
    };
  }());
  socket.on('subscribeOnRoom',
  /*#__PURE__*/
  function () {
    var _ref11 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(_ref10) {
      var roomId, playerId, res;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              roomId = _ref10.roomId, playerId = _ref10.playerId;
              res = new _respons["default"]({
                connectionType: 'singleRequest',
                socket: socket
              });
              _context6.t0 = _serviceRuner.makeServiceRunner;
              _context6.t1 = _service["default"].Room.Subscriber.Create;
              _context6.t2 = {
                roomId: roomId,
                playerId: playerId
              };
              _context6.next = 7;
              return (0, _contextBuilder["default"])({
                userUuid: playerId
              });

            case 7:
              _context6.t3 = _context6.sent;
              _context6.t4 = (0, _context6.t0)(_context6.t1, _context6.t2, _context6.t3);
              _context6.t5 = {
                res: res,
                req: req
              };
              (0, _context6.t4)(_context6.t5);

            case 11:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x5) {
      return _ref11.apply(this, arguments);
    };
  }());
  socket.on('disconnect',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7() {
    var res;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            res = new _respons["default"]({
              connectionType: 'noRequest',
              socket: socket
            });
            (0, _serviceRuner.makeServiceRunner)(_service["default"].Session.Delete, {
              socketId: socket.id
            }, {})({
              res: res,
              req: req
            });

          case 2:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
  socket.on('gameStart',
  /*#__PURE__*/
  function () {
    var _ref14 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(_ref13) {
      var roomId, playerId, res;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              roomId = _ref13.roomId, playerId = _ref13.playerId;
              res = new _respons["default"]({
                connectionType: 'roomRequest',
                socket: socket
              });
              _context8.t0 = _serviceRuner.makeServiceRunner;
              _context8.t1 = _service["default"].Game.Create;
              _context8.t2 = {
                roomId: roomId
              };
              _context8.next = 7;
              return (0, _contextBuilder["default"])({
                userUuid: playerId
              });

            case 7:
              _context8.t3 = _context8.sent;
              _context8.t4 = (0, _context8.t0)(_context8.t1, _context8.t2, _context8.t3);
              _context8.t5 = {
                res: res,
                req: req
              };
              (0, _context8.t4)(_context8.t5);

            case 11:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function (_x6) {
      return _ref14.apply(this, arguments);
    };
  }());
  socket.on('setFigure',
  /*#__PURE__*/
  function () {
    var _ref16 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9(_ref15) {
      var x, y, figure, playerId, roomId, res, game, step;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              x = _ref15.x, y = _ref15.y, figure = _ref15.figure, playerId = _ref15.playerId, roomId = _ref15.roomId;
              res = new _respons["default"]({
                connectionType: 'roomRequest',
                socket: socket
              });
              game = _gameContainer["default"].getGame(roomId);

              if (game) {
                _context9.next = 5;
                break;
              }

              return _context9.abrupt("return");

            case 5:
              _context9.t0 = _serviceRuner.makeServiceRunner;
              _context9.t1 = _service["default"].Game.Update;
              _context9.t2 = {
                x: x,
                y: y,
                figure: figure,
                roomId: roomId
              };
              _context9.next = 10;
              return (0, _contextBuilder["default"])({
                userUuid: playerId
              });

            case 10:
              _context9.t3 = _context9.sent;
              step = (0, _context9.t0)(_context9.t1, _context9.t2, _context9.t3);
              game.push(step.bind(step, {
                res: res,
                req: req
              }));

            case 13:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    return function (_x7) {
      return _ref16.apply(this, arguments);
    };
  }());
  socket.on('userList',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10() {
    var res;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            res = new _respons["default"]({
              connectionType: 'singleRequest',
              socket: socket
            });
            (0, _serviceRuner.makeServiceRunner)(_service["default"].User.List, {}, {})({
              res: res,
              req: req
            });

          case 2:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  })));
  socket.on('leftRoom',
  /*#__PURE__*/
  function () {
    var _ref19 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11(_ref18) {
      var roomId, playerId, res;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              roomId = _ref18.roomId, playerId = _ref18.playerId;
              res = new _respons["default"]({
                connectionType: 'singleRequest',
                socket: socket
              });
              _context11.t0 = _serviceRuner.makeServiceRunner;
              _context11.t1 = _service["default"].Room.Subscriber.Delete;
              _context11.t2 = {
                roomId: roomId,
                playerId: playerId
              };
              _context11.next = 7;
              return (0, _contextBuilder["default"])({
                userUuid: playerId
              });

            case 7:
              _context11.t3 = _context11.sent;
              _context11.t4 = (0, _context11.t0)(_context11.t1, _context11.t2, _context11.t3);
              _context11.t5 = {
                res: res,
                req: req
              };
              (0, _context11.t4)(_context11.t5);

            case 11:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));

    return function (_x8) {
      return _ref19.apply(this, arguments);
    };
  }());
  socket.on('deleteRoom',
  /*#__PURE__*/
  function () {
    var _ref21 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee12(_ref20) {
      var roomId, playerId, res;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              roomId = _ref20.roomId, playerId = _ref20.playerId;
              res = new _respons["default"]({
                connectionType: 'singleRequest',
                socket: socket
              });
              _context12.t0 = _serviceRuner.makeServiceRunner;
              _context12.t1 = _service["default"].Room.Delete;
              _context12.t2 = {
                roomId: roomId,
                playerId: playerId
              };
              _context12.next = 7;
              return (0, _contextBuilder["default"])({
                userUuid: playerId
              });

            case 7:
              _context12.t3 = _context12.sent;
              _context12.t4 = (0, _context12.t0)(_context12.t1, _context12.t2, _context12.t3);
              _context12.t5 = {
                res: res,
                req: req
              };
              (0, _context12.t4)(_context12.t5);

            case 11:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }));

    return function (_x9) {
      return _ref21.apply(this, arguments);
    };
  }());
  socket.on('urlCreate',
  /*#__PURE__*/
  function () {
    var _ref23 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee13(_ref22) {
      var roomName, playerId, res, srv, _ref24, type, roomId;

      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              roomName = _ref22.roomName, playerId = _ref22.playerId;
              console.log({
                roomName: roomName,
                playerId: playerId
              });
              res = new _respons["default"]({
                connectionType: 'singleRequest',
                socket: socket
              });
              srv = new _service["default"].Room.UrlCreate.Create();
              _context13.next = 6;
              return srv.run({
                name: roomName,
                playerId: playerId
              });

            case 6:
              _ref24 = _context13.sent;
              type = _ref24.type;
              roomId = _ref24.roomId;
              console.log({
                type: type,
                roomId: roomId
              });

              if (!(type === 'CREATE')) {
                _context13.next = 22;
                break;
              }

              _context13.t0 = _serviceRuner.makeServiceRunner;
              _context13.t1 = _service["default"].Room.Create;
              _context13.t2 = {
                name: roomName
              };
              _context13.next = 16;
              return (0, _contextBuilder["default"])({
                userUuid: playerId
              });

            case 16:
              _context13.t3 = _context13.sent;
              _context13.t4 = (0, _context13.t0)(_context13.t1, _context13.t2, _context13.t3);
              _context13.t5 = {
                res: res,
                req: req
              };
              (0, _context13.t4)(_context13.t5);
              _context13.next = 44;
              break;

            case 22:
              if (!(type === 'SUBSCRIBE')) {
                _context13.next = 34;
                break;
              }

              _context13.t6 = _serviceRuner.makeServiceRunner;
              _context13.t7 = _service["default"].Room.Subscriber.Create;
              _context13.t8 = {
                roomId: roomId,
                playerId: playerId
              };
              _context13.next = 28;
              return (0, _contextBuilder["default"])({
                userUuid: playerId
              });

            case 28:
              _context13.t9 = _context13.sent;
              _context13.t10 = (0, _context13.t6)(_context13.t7, _context13.t8, _context13.t9);
              _context13.t11 = {
                res: res,
                req: req
              };
              (0, _context13.t10)(_context13.t11);
              _context13.next = 44;
              break;

            case 34:
              if (!(type === 'NO_USER')) {
                _context13.next = 44;
                break;
              }

              _context13.t12 = _serviceRuner.makeServiceRunner;
              _context13.t13 = _service["default"].Room.UrlCreate.Delete;
              _context13.t14 = {
                roomId: roomId,
                playerId: playerId
              };
              _context13.next = 40;
              return (0, _contextBuilder["default"])({
                userUuid: playerId
              });

            case 40:
              _context13.t15 = _context13.sent;
              _context13.t16 = (0, _context13.t12)(_context13.t13, _context13.t14, _context13.t15);
              _context13.t17 = {
                res: res,
                req: req
              };
              (0, _context13.t16)(_context13.t17);

            case 44:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }));

    return function (_x10) {
      return _ref23.apply(this, arguments);
    };
  }());
}