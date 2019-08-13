"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xHandler = exports.yHandler = exports.handleCollision = void 0;

var _configUi = _interopRequireDefault(require("../../../etc/config-ui"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var handleCollision = function handleCollision(y, x, table, figure) {
  var setFigure = function setFigure(table, figure) {
    figure.forEach(function (row, i) {
      (function (col, j) {
        table[i + y][j + x] = 1;
      });
    });
  };

  for (var i = 0; i < figure.length; i++) {
    if (table[y][x + i] > 0) {
      setFigure(table, figure);
      return;
    }
  }
};

exports.handleCollision = handleCollision;

var yHandler = function yHandler(state, action) {
  var newStateY = _objectSpread({}, state);

  var tableStateY = newStateY.tables[newStateY.userUuid];
  var lengthY = tableStateY.current.cord.y + tableStateY.current.figure.figure[0].length + action.pos;

  if (lengthY > _configUi["default"].COL || tableStateY.current.cord.y + action.pos < 0 || tableStateY.current.cord.y + action.pos < 0) {
    return newStateY;
  }

  newStateY.tables[newStateY.userUuid].current.cord.y += action.pos;
  newStateY.i = newStateY.i + 1;
  return newStateY;
};

exports.yHandler = yHandler;

var xHandler = function xHandler(state, action) {
  var newStateX = _objectSpread({}, state);

  var tableState = newStateX.tables[newStateX.userUuid];
  var lengthX = tableState.current.cord.x + tableState.current.figure.figure.length + action.pos;
  var lengthY = tableState.current.cord.y + tableState.current.figure.figure[0].length;

  if (lengthX > _configUi["default"].ROW || tableState.current.cord.x + action.pos < 0 || tableState.current.cord.y + action.pos < 0) {
    return newStateX;
  }

  handleCollision(lengthX, lengthY, newStateX.tables[newStateX.userUuid].table, tableState.current.cord.x + tableState.current.figure.figure);
  newStateX.tables[newStateX.userUuid].current.cord.x += action.pos;
  newStateX.i = newStateX.i + 1;
  return newStateX;
}; // export const handleCollision = (y, x, table, figure) => {
//   connsole.log({y, x, table, figure});
//   const setFigure = (table, figure) => {
//     figure.map((row, i) => {
//       (col, j) => {
//         table[i + y][j + x] = 1;
//       }
//     });
//   };
//
//   for (let i = 0; i < figure.length; i++) {
//     if (table[y][x + i] > 0) {
//       setFigure(table, figure);
//       return;
//     }
//   }
// };


exports.xHandler = xHandler;