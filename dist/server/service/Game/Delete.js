"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Base2 = _interopRequireDefault(require("./../Base"));

var _Game = _interopRequireDefault(require("./../../model/Game"));

var _Player = _interopRequireDefault(require("./../../model/Player"));

var _gameContainer = _interopRequireDefault(require("./../../core/gameContainer"));

var _socket = _interopRequireDefault(require("./../../core/socket"));

var _EventRouter = _interopRequireDefault(require("../../router/EventRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Delete =
/*#__PURE__*/
function (_Base) {
  _inherits(Delete, _Base);

  function Delete() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Delete);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Delete)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "validateRules", ['roomId']);

    return _this;
  }

  _createClass(Delete, [{
    key: "execute",
    value: function () {
      var _execute = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref) {
        var roomId, game, winers, l, id, gameManager, _user, _gameManager;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                roomId = _ref.roomId;
                _context.next = 3;
                return _Game["default"].findOne({
                  roomId: roomId
                });

              case 3:
                game = _context.sent;

                if (!game) {
                  this.throwError({
                    field: 'Game',
                    message: 'Yoops, such game already exis'
                  });
                }

                winers = [];
                l = 0;

                for (id in game.tables) {
                  l++;
                  if (!game.tables[id].isEnd) winers.push(id);
                }

                if (!(l === 1)) {
                  _context.next = 19;
                  break;
                }

                gameManager = _gameContainer["default"].getGame(game.roomId);
                gameManager.stopGame();

                _socket["default"].sendToRoom(game.roomId, {
                  type: 'gameWiner',
                  name: 'Not you'
                });

                _socket["default"].clearRoom(game.roomId);

                _gameContainer["default"].clearContainer();

                game.status = 'pending';
                game.tables = {};
                _context.next = 18;
                return game.save();

              case 18:
                return _context.abrupt("return", {
                  Status: 1,
                  type: 'gameEnd',
                  gameId: game.roomId,
                  winer: user
                });

              case 19:
                if (!(winers.length === 1)) {
                  _context.next = 37;
                  break;
                }

                _context.next = 22;
                return _Player["default"].findOne({
                  playerId: winers[0]
                });

              case 22:
                _user = _context.sent;

                if (!_user) {
                  this.throwError({
                    field: 'User',
                    message: 'Yoops, no such user'
                  });
                }

                _user.score += 1;
                _context.next = 27;
                return _user.save();

              case 27:
                _gameManager = _gameContainer["default"].getGame(game.roomId);

                _gameManager.stopGame();

                _socket["default"].sendToRoom(game.roomId, {
                  type: 'gameWiner',
                  name: _user.name
                });

                _socket["default"].clearRoom(game.roomId);

                _gameContainer["default"].clearContainer();

                game.status = 'pending';
                game.tables = {};
                _context.next = 36;
                return game.save();

              case 36:
                return _context.abrupt("return", {
                  Status: 1,
                  type: 'gameEnd',
                  gameId: game.roomId,
                  winer: _user
                });

              case 37:
                return _context.abrupt("return", {
                  Status: 1,
                  type: 'reset',
                  gameId: game.roomId,
                  gameData: _objectSpread({}, game.getValue(), {
                    updatedBy: user.playerId
                  })
                });

              case 38:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function execute(_x) {
        return _execute.apply(this, arguments);
      }

      return execute;
    }()
  }]);

  return Delete;
}(_Base2["default"]);

exports["default"] = Delete;