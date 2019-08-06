"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _socket = _interopRequireDefault(require("./socket"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var execQueue =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(game) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(game.inQueue && game.serviceQueue.length)) {
              _context.next = 7;
              break;
            }

            console.log('START RUN SERVISE ', new Date());
            _context.next = 4;
            return game.serviceQueue[0]();

          case 4:
            console.log('STOP RUN SERVISE ', new Date());
            game.serviceQueue.shift();

            if (!game.serviceQueue.length) {
              game.inQueue = false;
            }

          case 7:
            if (game.serviceQueue.length) {
              setTimeout(execQueue.bind({}, game), 0);
            }

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function execQueue(_x) {
    return _ref.apply(this, arguments);
  };
}();

var GameRunner =
/*#__PURE__*/
function () {
  function GameRunner(game) {
    _classCallCheck(this, GameRunner);

    this.game = game;
    this.status = true;
    this.serviceQueue = [];
    this.da = true;
  }

  _createClass(GameRunner, [{
    key: "createRunner",
    value: function createRunner(roomId) {
      return function gameTick() {
        _socket["default"].emit('action', {
          Status: 1,
          type: 'goDown'
        }, roomId);
      };
    }
  }, {
    key: "runGame",
    value: function runGame() {
      this.fd = setInterval(this.createRunner(this.game.roomId), 100000);
      this.queueFd = setInterval(this.execQueue.bind(this), 50);
    }
  }, {
    key: "stopGame",
    value: function stopGame() {
      clearInterval(this.fd);
      clearInterval(this.queueFd);
      this.game = null;
      this.status = false;
    }
  }, {
    key: "execQueue",
    value: function () {
      var _execQueue = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(this.da && this.serviceQueue.length)) {
                  _context2.next = 6;
                  break;
                }

                this.da = false;
                _context2.next = 4;
                return this.serviceQueue[0]();

              case 4:
                this.serviceQueue.shift();
                this.da = true;

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function execQueue() {
        return _execQueue.apply(this, arguments);
      }

      return execQueue;
    }()
  }, {
    key: "push",
    value: function () {
      var _push = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(service) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.serviceQueue.push(service);

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function push(_x2) {
        return _push.apply(this, arguments);
      }

      return push;
    }()
  }]);

  return GameRunner;
}();

exports["default"] = GameRunner;