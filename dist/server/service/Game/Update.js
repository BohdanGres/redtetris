"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Base2 = _interopRequireDefault(require("./../Base"));

var _Game = _interopRequireDefault(require("./../../model/Game"));

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

var getRandomInt = function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var Update =
/*#__PURE__*/
function (_Base) {
  _inherits(Update, _Base);

  function Update() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Update);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Update)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "validateRules", ['x', 'y', 'figure', 'roomId']);

    return _this;
  }

  _createClass(Update, [{
    key: "execute",
    value: function () {
      var _execute = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref) {
        var x, y, figure, roomId, user, game, userTable, isEnd, current, rowEmpted, newTable, i, allTable;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                x = _ref.x, y = _ref.y, figure = _ref.figure, roomId = _ref.roomId;
                user = this.context.user;

                if (!user) {
                  this.throwError({
                    field: 'User',
                    message: 'Yoops, you need login first'
                  });
                }

                console.log('GAME START FIND IN UPDATE', new Date());
                _context.next = 6;
                return _Game["default"].findOne({
                  roomId: roomId
                });

              case 6:
                game = _context.sent;

                if (!game) {
                  this.throwError({
                    field: 'Game',
                    message: 'Yoops, such game already exis'
                  });
                }

                userTable = game.tables[user.playerId];

                if (userTable.isEnd) {
                  this.throwError({
                    field: 'User',
                    message: 'Yoops, you looser'
                  });
                }

                isEnd = false;
                figure.forEach(function (row, i) {
                  row.forEach(function (col, j) {
                    if (userTable.table[x + i][y + j] && col) {
                      isEnd = true;
                    }

                    userTable.table[x + i][y + j] = col ? col : userTable.table[x + i][y + j];
                  });
                });

                if (!isEnd) {
                  _context.next = 19;
                  break;
                }

                game.tables[user.playerId].isEnd = true;
                game.markModified('tables');
                _context.next = 17;
                return game.save();

              case 17:
                _EventRouter["default"].emit('serverEvent', {
                  event: 'looseGame',
                  data: {
                    roomId: game.roomId
                  }
                });

                return _context.abrupt("return", {
                  Status: 1,
                  type: 'gameUpdate',
                  gameId: game.roomId,
                  gameData: _objectSpread({}, game.getValue(), {
                    updatedBy: user.playerId
                  })
                });

              case 19:
                userTable.step += 1;
                current = game.getCurent(userTable.step);
                rowEmpted = 0;
                newTable = userTable.table.map(function (tr, i, tablr) {
                  var da = tr.every(function (e) {
                    return e > 0 && e !== 6;
                  });
                  rowEmpted += da;

                  if (da) {
                    return false;
                  }

                  return tr;
                });
                newTable = newTable.filter(function (tr) {
                  return tr;
                });

                for (i = newTable.length; i < 20; i++) {
                  newTable.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                }

                userTable.table = newTable;
                userTable.isEnd = isEnd;
                userTable.current = {
                  figure: current,
                  cord: {
                    x: 0,
                    y: 4
                  }
                };
                allTable = _objectSpread({}, game.tables);
                allTable[user.playerId] = userTable;
                game.tables = allTable; //JSON.parse(JSON.stringify(allTable)) ;

                game.markModified('tables'); // console.log('GAME SAE IN UPDATE START', new Date());

                _context.next = 34;
                return game.save();

              case 34:
                // console.log('GAME SAE IN UPDATE END', new Date());
                if (rowEmpted) {
                  _EventRouter["default"].emit('serverEvent', {
                    event: 'blockRow',
                    data: {
                      blockedRoom: rowEmpted,
                      playerId: user.playerId,
                      roomId: roomId
                    }
                  });
                }

                return _context.abrupt("return", {
                  Status: 1,
                  type: 'gameUpdate',
                  gameId: game.roomId,
                  gameData: _objectSpread({}, game.getValue(), {
                    updatedBy: user.playerId
                  })
                });

              case 36:
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

  return Update;
}(_Base2["default"]);

exports["default"] = Update;