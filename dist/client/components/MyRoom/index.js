"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _socket = _interopRequireDefault(require("../../utils/socket"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var playerList = function playerList(name, i) {
  return _react["default"].createElement(_ListItem["default"], {
    key: i
  }, _react["default"].createElement(_ListItemText["default"], {
    variant: "h3",
    primary: name
  }));
};

var MyRoom = function MyRoom(room, userUuid) {
  var handler = function handler() {
    _socket["default"].emit('gameStart', {
      roomId: room.roomId,
      playerId: userUuid
    });
  };

  var handleLeft = function handleLeft() {
    _socket["default"].emit('leftRoom', {
      roomId: room.roomId,
      playerId: userUuid
    });
  };

  var handleDelete = function handleDelete() {
    _socket["default"].emit('deleteRoom', {
      roomId: room.roomId,
      playerId: userUuid
    });
  };

  var yourRoom = room.createdBy == userUuid;
  return _react["default"].createElement("div", null, _react["default"].createElement(_Typography["default"], {
    variant: "h4"
  }, "Players :"), _react["default"].createElement(_List["default"], null, room.playerNames.map(function (name, i) {
    return playerList(name, i);
  })), _react["default"].createElement(_Button["default"], {
    variant: "outlined",
    color: "secondary",
    onClick: yourRoom ? handler : handleLeft
  }, yourRoom ? 'START!!!' : 'left room'), yourRoom ? _react["default"].createElement(_Button["default"], {
    variant: "outlined",
    color: "secondary",
    onClick: handleDelete
  }, "Delete(") : '');
};

var _default = MyRoom;
exports["default"] = _default;