"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Base2 = _interopRequireDefault(require("./../Base"));

var _Game = _interopRequireDefault(require("./../../model/Game"));

var _Player = _interopRequireDefault(require("./../../model/Player"));

var _socket = _interopRequireDefault(require("./../../core/socket"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _EventRouter = require("../../router/EventRouter");

var _gameContainer = _interopRequireDefault(require("./../../core/gameContainer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var Create =
/*#__PURE__*/
function (_Base) {
  _inherits(Create, _Base);

  function Create() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Create);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Create)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "validateRules", ['roomId']);

    return _this;
  }

  _createClass(Create, [{
    key: "execute",
    value: function () {
      var _execute = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref) {
        var roomId, user, game, players, ids, startedGame, cont;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                roomId = _ref.roomId;
                user = this.context.user;

                if (!user) {
                  this.throwError({
                    field: 'User',
                    message: 'Yoops, you need login first'
                  });
                }

                _context.next = 5;
                return _Game["default"].findOne({
                  roomId: roomId
                });

              case 5:
                game = _context.sent;

                if (!game) {
                  this.throwError({
                    field: 'Game',
                    message: 'Yoops, no such game'
                  });
                }

                _context.next = 9;
                return _Player["default"].find({
                  playerId: game.playerIds
                });

              case 9:
                players = _context.sent;
                ids = [];
                players.map(function (player) {
                  var conection = _socket["default"].io.sockets.connected[player.socketId];

                  if (conection) {
                    conection.join(game.roomId);
                    ids.push(player.playerId);
                  } else {
                    console.log('NO CONECTION');
                  }

                  player.status = 'IN GAME';
                  player.save();
                });
                _context.next = 14;
                return game.InitGame(ids);

              case 14:
                startedGame = _context.sent;
                console.log('==============================================');
                _context.next = 18;
                return _gameContainer["default"];

              case 18:
                cont = _context.sent;
                cont.push(startedGame.getValue());
                return _context.abrupt("return", {
                  Status: 1,
                  type: 'gameStart',
                  gameId: game.roomId,
                  gameData: game.getValue()
                });

              case 21:
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

  return Create;
}(_Base2["default"]);

exports["default"] = Create;