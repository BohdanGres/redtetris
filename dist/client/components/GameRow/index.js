"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _PlusOne = _interopRequireDefault(require("@material-ui/icons/PlusOne"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography/Typography"));

var _socket = _interopRequireDefault(require("./../../utils/socket"));

var _cookie = require("./../../utils/cookie");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GameRow = function GameRow(room, i, status) {
  var name = room.roomName;
  var id = room.roomId;
  var playersCount = room.playerIds.length;

  var handleToggle = function handleToggle() {
    if (status) {
      return;
    }

    _socket["default"].emit('subscribeOnRoom', {
      roomId: id,
      playerId: (0, _cookie.getCookie)('uuid')
    });
  };

  return _react["default"].createElement(_ListItem["default"], {
    key: i,
    button: true,
    onClick: handleToggle
  }, _react["default"].createElement(_ListItemText["default"], {
    primary: "Room: ".concat(room.roomName)
  }), _react["default"].createElement(_Typography["default"], null, "".concat(playersCount, "/5")), _react["default"].createElement(_PlusOne["default"], null));
};

var _default = GameRow;
exports["default"] = _default;