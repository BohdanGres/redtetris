"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iniEventRouter = iniEventRouter;
exports["default"] = void 0;

var _serviceRuner = require("./../core/serviceRuner");

var _service = _interopRequireDefault(require("../service"));

var _respons = _interopRequireDefault(require("./../core/respons"));

var _request = _interopRequireDefault(require("./../core/request"));

var _gameContainer = _interopRequireDefault(require("../core/gameContainer"));

var _contextBuilder = _interopRequireDefault(require("../utils/contextBuilder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var EventEmitter = require('events');

var eventEmitter = new EventEmitter();

function iniEventRouter() {
  eventEmitter.on('serverEvent',
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_ref) {
      var event, data, res, _res, req, game, step, _res2, _req, _game, _step;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              event = _ref.event, data = _ref.data;
              _context.t0 = event;
              _context.next = _context.t0 === 'roomListUpdate' ? 4 : _context.t0 === 'blockRow' ? 7 : _context.t0 === 'looseGame' ? 15 : 23;
              break;

            case 4:
              res = new _respons["default"]({
                connectionType: 'allRequest',
                socket: {}
              });
              (0, _serviceRuner.makeServiceRunner)(_service["default"].Room.List, {}, {})({
                res: res,
                req: {}
              });
              return _context.abrupt("break", 24);

            case 7:
              _res = new _respons["default"]({
                connectionType: 'roomRequest',
                socket: {}
              });
              req = new _request["default"]({
                id: null
              });
              game = _gameContainer["default"].getGame(data.roomId);

              if (game) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return");

            case 12:
              step = (0, _serviceRuner.makeServiceRunner)(_service["default"].Game.Row.Update, _objectSpread({}, data), {});
              game.push(step.bind(step, {
                res: _res,
                req: req
              }));
              return _context.abrupt("break", 24);

            case 15:
              _res2 = new _respons["default"]({
                connectionType: 'roomRequest',
                socket: {}
              });
              _req = new _request["default"]({
                id: null
              });
              _game = _gameContainer["default"].getGame(data.roomId);

              if (_game) {
                _context.next = 20;
                break;
              }

              return _context.abrupt("return");

            case 20:
              _step = (0, _serviceRuner.makeServiceRunner)(_service["default"].Game.Delete, _objectSpread({}, data), {});

              _game.push(_step.bind(_step, {
                res: _res2,
                req: _req
              }));

              return _context.abrupt("break", 24);

            case 23:
              return _context.abrupt("break", 24);

            case 24:
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
}

var _default = eventEmitter;
exports["default"] = _default;