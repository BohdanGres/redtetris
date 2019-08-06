"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Piece = _interopRequireDefault(require("./Piece"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var gameSchema = new _mongoose["default"].Schema({
  roomId: {
    type: String
  },
  roomName: {
    type: String,
    "default": ''
  },
  createdBy: {
    type: String
  },
  playerIds: [{
    type: String
  }],
  playerNames: [{
    type: String
  }],
  status: {
    type: String,
    "default": 'PENDING'
  },
  tables: {
    type: Object,
    "default": {}
  },
  pieces: {
    type: Array,
    "default": []
  }
}, {
  versionKey: false // You should be aware of the outcome after set to false

});

var getRandomInt = function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

gameSchema.methods.getValue = function () {
  return {
    roomId: this.roomId,
    roomName: this.roomName,
    createdBy: this.createdBy,
    playerIds: this.playerIds,
    playerNames: this.playerNames,
    status: this.status,
    tables: this.tables,
    pieces: this.pieces
  };
};

gameSchema.methods.InitGame =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(playerIds) {
    var _this = this;

    var shuffleArray, generateTable, getCurent, current, newTable, board, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, id;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            shuffleArray = function _ref4(arr) {
              var array = _toConsumableArray(arr);

              for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var _ref2 = [array[j], array[i]];
                array[i] = _ref2[0];
                array[j] = _ref2[1];
              }

              return array;
            };

            generateTable = function generateTable() {
              var b = Array.from(Array(20), function () {
                return [];
              });
              b = b.map(function (e) {
                return Array.from(Array(10), function (x, i) {
                  return 0;
                });
              });
              return b;
            };

            getCurent =
            /*#__PURE__*/
            function () {
              var _ref3 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(i) {
                var j;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (i >= _this.pieces.length) {
                          j = getRandomInt(_this.pieces.length - 1);

                          _this.pieces.push(_objectSpread({}, _this.pieces[j]));
                        }

                        return _context.abrupt("return", _this.pieces[i]);

                      case 2:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function getCurent(_x2) {
                return _ref3.apply(this, arguments);
              };
            }();

            _context2.t0 = shuffleArray;
            _context2.next = 6;
            return _Piece["default"].getAll();

          case 6:
            _context2.t1 = _context2.sent;
            this.pieces = (0, _context2.t0)(_context2.t1);
            _context2.next = 10;
            return getCurent(0, getRandomInt(4) + 1);

          case 10:
            current = _context2.sent;
            newTable = {};
            board = generateTable();
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 16;

            for (_iterator = playerIds[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              id = _step.value;
              newTable[id] = {
                current: {
                  figure: current.getPiece(),
                  cord: {
                    x: 0,
                    y: 4
                  }
                },
                step: 0,
                table: board
              };
            }

            _context2.next = 24;
            break;

          case 20:
            _context2.prev = 20;
            _context2.t2 = _context2["catch"](16);
            _didIteratorError = true;
            _iteratorError = _context2.t2;

          case 24:
            _context2.prev = 24;
            _context2.prev = 25;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 27:
            _context2.prev = 27;

            if (!_didIteratorError) {
              _context2.next = 30;
              break;
            }

            throw _iteratorError;

          case 30:
            return _context2.finish(27);

          case 31:
            return _context2.finish(24);

          case 32:
            this.tables = newTable;
            this.status = 'IN GAME';
            _context2.next = 36;
            return this.save();

          case 36:
            return _context2.abrupt("return", this);

          case 37:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[16, 20, 24, 32], [25,, 27, 31]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

gameSchema.methods.runGame =
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee3() {
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
}));

gameSchema.methods.getCurent = function (i, color) {
  var _this2 = this;

  if (i >= this.pieces.length) {
    var j = getRandomInt(this.pieces.length - 1);
    this.pieces.push(_objectSpread({}, this.pieces[j]));
  }

  this.pieces[i].figure = this.pieces[i].figure.map(function (t) {
    return t.map(function (c) {
      return c ? _this2.pieces[i].color : c;
    });
  });
  return this.pieces[i];
};

var Game = _mongoose["default"].model('Game', gameSchema);

var _default = Game;
exports["default"] = _default;