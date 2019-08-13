"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _socket = _interopRequireDefault(require("socket.io-client"));

var _init = require("../actions/init");

var _error = require("../actions/error");

var _cookie = require("./cookie");

var _auth = require("../actions/auth");

var _roomListUpdate = require("../actions/roomListUpdate");

var _roomCreate = require("../actions/roomCreate");

var _sessionInit = require("../actions/sessionInit");

var _gameAction = require("../actions/gameAction");

var _user = require("../actions/user");

var _store = _interopRequireWildcard(require("./store"));

var _clearStore = require("../actions/clearStore");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var socket = (0, _socket["default"])('http://localhost:3004');
socket.on('connection', function () {
  socket.emit('roomList', {});
  socket.emit('userList', {});
});
socket.on('reconnect', function () {
  socket.emit('initSession', (0, _cookie.getUserState)());
});
socket.on('connect', function () {
  socket.emit('initSession', (0, _cookie.getUserState)());
  socket.emit('roomList', {});
  socket.emit('userList', {});
});
socket.on('action', function (data) {
  switch (data.type) {
    case 'init':
      _store["default"].dispatch((0, _init.init)(data.body));

      break;

    case 'errorPopup':
      _store["default"].dispatch((0, _error.error)(data.error));

      break;

    case 'userCreate':
      (0, _cookie.setCookie)('uuid', data.uuid, 60);
      (0, _cookie.setCookie)('userName', data.name, 60);

      _store["default"].dispatch((0, _auth.auth)({
        userUuid: data.uuid,
        userName: data.name,
        userType: 'LOGED',
        loginPopup: false
      }));

      break;

    case 'listRoomUpdate':
      _store["default"].dispatch((0, _roomListUpdate.roomListUpdate)(data.roomList));

      break;

    case 'roomCreate':
      _store["default"].dispatch((0, _roomCreate.roomCreate)(data.game));

      break;

    case 'sessionInit':
      _store["default"].dispatch((0, _sessionInit.sessionInit)(data.roomPending));

      break;

    case 'gameStart':
      _store["default"].dispatch((0, _gameAction.gameStart)(data.gameData));

      break;

    case 'gameUpdate':
      _store["default"].dispatch((0, _gameAction.gameUpdate)(data.gameData));

      break;

    case 'goDown':
      window.dispatchEvent(new KeyboardEvent('keydown', {
        'key': 'ArrowDown'
      })); // store.dispatch(x(1));

      break;

    case 'gameUpdateRow':
      _store["default"].dispatch((0, _gameAction.block)());

      _store["default"].dispatch((0, _gameAction.blockRow)(data.gameData));

      break;

    case 'listUser':
      _store["default"].dispatch((0, _user.users)(data.userList));

      break;

    case 'roomSubscribe':
      _store["default"].dispatch((0, _roomCreate.roomCreate)(data.game));

      break;

    case 'gameWiner':
      _store["default"].dispatch((0, _gameAction.gameEnd)(data.name));

      break;

    case 'reset':
      _store["default"].dispatch((0, _clearStore.clearStoreSoft)((0, _store.getInitialState)()));

      break;

    case 'NO_USER':
      (0, _cookie.setCookie)('uuid', '', 60);
      (0, _cookie.setCookie)('userName', '', 60);

      _store["default"].dispatch((0, _clearStore.clearStoreSoft)((0, _store.getInitialState)()));

      break;
  }
});
socket.on('RESPONS', function (data) {});
var _default = socket;
exports["default"] = _default;