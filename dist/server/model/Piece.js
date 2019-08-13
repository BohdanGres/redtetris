"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _configBe = _interopRequireDefault(require("./../../../etc/config-be"));

var _v = _interopRequireDefault(require("uuid/v4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var figurs = _configBe["default"].figurs;
var gameSchema = new _mongoose["default"].Schema({
  pieceId: {
    type: String,
    "default": function _default() {
      return (0, _v["default"])();
    }
  },
  figure: {
    type: Array,
    "default": []
    /*figurs[getRandomInt(figurs.length)]*/

  },
  color: {
    type: Number,
    "default": 1
  }
}); // gameSchema.virtual('color').get(() => Math.floor(Math.random() * Math.floor(6)));

var all = [];
gameSchema.statics.getAll =
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var array, a;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (all.length) {
            _context.next = 6;
            break;
          }

          array = figurs.map(function (figure) {
            return {
              figure: figure,
              color: Math.floor(Math.random() * Math.floor(4)) + 1
            };
          });
          _context.next = 4;
          return this.insertMany(array);

        case 4:
          a = _context.sent;
          all.push.apply(all, _toConsumableArray(a));

        case 6:
          return _context.abrupt("return", all);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
}));

gameSchema.methods.getPiece = function () {
  var _this = this;

  var tbl = _toConsumableArray(this.figure);

  var fig = tbl.map(function (t) {
    return t.map(function (b) {
      return b ? _this.color : b;
    });
  });
  return {
    figure: fig
  };
};

gameSchema.methods.getValue = function () {
  return {
    pieceId: this.pieceId,
    figure: this.figure,
    color: this.color
  };
};

var Piece = _mongoose["default"].model('Piece', gameSchema);

var _default2 = Piece;
exports["default"] = _default2;