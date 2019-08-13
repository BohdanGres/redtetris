"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gameEnd = exports.GAME_END = exports.block = exports.BLOCK = exports.blockRow = exports.BLOCK_ROW = exports.rotate = exports.ROTATE = exports.blockDown = exports.BLOCK_DOWN = exports.gameUpdate = exports.GAME_UPDATE = exports.x = exports.X_ARROW = exports.y = exports.Y_ARROW = exports.gameStart = exports.GAME_START = void 0;
var GAME_START = 'GAME_START';
exports.GAME_START = GAME_START;

var gameStart = function gameStart(gameData) {
  return {
    type: GAME_START,
    gameData: gameData
  };
};

exports.gameStart = gameStart;
var Y_ARROW = 'Y_ARROW';
exports.Y_ARROW = Y_ARROW;

var y = function y(pos) {
  return {
    type: Y_ARROW,
    pos: pos
  };
};

exports.y = y;
var X_ARROW = 'X_ARROW';
exports.X_ARROW = X_ARROW;

var x = function x(pos) {
  return {
    type: X_ARROW,
    pos: pos
  };
};

exports.x = x;
var GAME_UPDATE = 'GAME_UPDATE';
exports.GAME_UPDATE = GAME_UPDATE;

var gameUpdate = function gameUpdate(gameData) {
  return {
    type: GAME_UPDATE,
    gameData: gameData
  };
};

exports.gameUpdate = gameUpdate;
var BLOCK_DOWN = 'BLOCK_DOWN';
exports.BLOCK_DOWN = BLOCK_DOWN;

var blockDown = function blockDown() {
  return {
    type: BLOCK_DOWN
  };
};

exports.blockDown = blockDown;
var ROTATE = 'ROTATE';
exports.ROTATE = ROTATE;

var rotate = function rotate(matrix) {
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

  return {
    type: ROTATE,
    mat: delta
  };
};

exports.rotate = rotate;
var BLOCK_ROW = 'BLOCK_ROW';
exports.BLOCK_ROW = BLOCK_ROW;

var blockRow = function blockRow(gameData) {
  return {
    type: BLOCK_ROW,
    gameData: gameData
  };
};

exports.blockRow = blockRow;
var BLOCK = 'BLOCK';
exports.BLOCK = BLOCK;

var block = function block() {
  return {
    type: BLOCK
  };
};

exports.block = block;
var GAME_END = 'GAME_END';
exports.GAME_END = GAME_END;

var gameEnd = function gameEnd(data) {
  return {
    type: GAME_END,
    name: data
  };
};

exports.gameEnd = gameEnd;