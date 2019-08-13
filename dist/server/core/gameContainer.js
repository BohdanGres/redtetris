"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Game = _interopRequireDefault(require("./../model/Game"));

var _Player = _interopRequireDefault(require("./../model/Player"));

var _gameRunner = _interopRequireDefault(require("./gameRunner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GameContainr =
/*#__PURE__*/
function () {
  function GameContainr() {
    _classCallCheck(this, GameContainr);

    this.gameList = [];
  }

  _createClass(GameContainr, [{
    key: "push",
    value: function push(game) {
      console.log('GAME PUSHED');
      var startedGame = new _gameRunner["default"](game, this.gameList.length);
      startedGame.runGame();
      this.gameList.push(startedGame);
    }
  }, {
    key: "getGame",
    value: function getGame(id) {
      return this.gameList.find(function (GameRunner) {
        return GameRunner.game && GameRunner.game.roomId;
      });
    }
  }, {
    key: "getGameList",
    value: function getGameList() {
      return this.gameList;
    }
  }, {
    key: "clearContainer",
    value: function clearContainer() {
      this.gameList.filter(function (runningGame) {
        return !runningGame.game;
      });
    }
  }]);

  return GameContainr;
}();

var container = new GameContainr();
var _default = container;
exports["default"] = _default;