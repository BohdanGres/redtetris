"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = eventInit;

var _store = _interopRequireDefault(require("./store"));

var _gameAction = require("../actions/gameAction");

var _configUi = _interopRequireDefault(require("../../../etc/config-ui"));

var _socket = _interopRequireDefault(require("./socket"));

var _cookie = require("./cookie");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function eventInit() {
  function cb(e) {
    var state = _store["default"].getState();

    if (state.blockDown) return;

    var rotateF = function rotateF(state) {
      var id = state.userUuid;
      var figure = state.tables[id].current.figure.figure;

      _store["default"].dispatch((0, _gameAction.rotate)(figure));
    };

    var rot = function rot(matrix) {
      var theta = matrix.reduce(function (omega, alpha) {
        return omega.concat(alpha);
      });
      var delta = [];

      for (var _x = 0; _x < matrix[0].length; _x++) {
        var i = _x;
        delta[_x] = [];

        for (var j = i; j < theta.length;) {
          delta[_x].push(theta[j]);

          j += matrix[0].length;
        }

        delta[_x].reverse();
      }

      return delta;
    }; // return xHandler(newStateX, action);


    if (state.page !== 'game') {
      return;
    }

    var keys = {
      ArrowRight: {
        f: function f() {
          return _store["default"].dispatch((0, _gameAction.y)(1));
        },
        dx: 1,
        dy: 0
      },
      ArrowUp: {
        f: function f() {
          var figure = rotateF(state);
        },
        dx: 0,
        dy: 0
      },
      ArrowDown: {
        f: function f() {
          return _store["default"].dispatch((0, _gameAction.x)(1));
        },
        dx: 0,
        dy: 1
      },
      ArrowLeft: {
        f: function f() {
          return _store["default"].dispatch((0, _gameAction.y)(-1));
        },
        dx: -1,
        dy: 0
      }
    }; // if (e.key === 'ArrowDown') {
    // }

    if (keys[e.key]) {
      var _keys$e$key = keys[e.key],
          f = _keys$e$key.f,
          dx = _keys$e$key.dx,
          dy = _keys$e$key.dy;
      var flag = false;
      var tableState = JSON.parse(JSON.stringify(state.tables[state.userUuid]));
      var lengthX = tableState.current.cord.x + tableState.current.figure.figure.length + 1;
      var newXX = tableState.current.cord.x;
      var newYY = tableState.current.cord.y;
      var figure = tableState.current.figure.figure;

      if (e.key === 'ArrowUp') {
        figure = rot(figure);
      }

      var table = tableState.table;

      try {
        figure.forEach(function (line, y) {
          line.forEach(function (bloc, x) {
            var newY = y + newXX + dy;
            var newX = x + newYY + dx;

            if (newX < 0 || newX > 10) {
              ;
              throw 0;
            }

            var onBoard = true;
            var free = true;
            if (newY > 19) throw 0;
            if (onBoard && newY >= 0 && table[newY][newX] !== 0) free = false;
            if (figure[y][x] > 0 && (!onBoard || !free)) throw 0;
          });
        });
      } catch (e) {
        flag = true;
      }

      if (flag) {
        if (e.key !== 'ArrowDown') {
          return;
        }

        _socket["default"].emit('setFigure', {
          x: newXX,
          y: newYY,
          figure: figure,
          playerId: (0, _cookie.getCookie)('uuid'),
          roomId: state.roomId
        });

        _store["default"].dispatch((0, _gameAction.blockDown)());

        return;
      }

      f();
    }
  }

  ;
  window.addEventListener('keydown', cb, true);
}