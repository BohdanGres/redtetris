"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _configUi = _interopRequireDefault(require("./../../../etc/config-ui"));

var _gameHandlers = require("./../utils/gameHandlers");

var _socket = _interopRequireDefault(require("./../utils/socket"));

var _cookie = require("./../utils/cookie");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'server/ping':
      return _objectSpread({}, state);

    case 'INIT_TYPE':
      return _objectSpread({}, state, {}, action.body);

    case 'ALERT_POP':
      return _objectSpread({}, state, {}, action);

    case 'CHANGE_WIDTH':
      return _objectSpread({}, state, {
        width: action.width
      });

    case 'SET_NAME':
      return _objectSpread({}, state, {
        userName: action.name
      });

    case 'ERROR':
      return _objectSpread({}, state, {
        error: action.error
      });

    case 'USER_CREATE':
      return _objectSpread({}, state, {}, action.userData);

    case 'AUTH':
      return _objectSpread({}, state, {}, action.data);

    case 'CLEAR_STORE':
      return _objectSpread({}, action.initialStore, {
        userUuid: '',
        userName: '',
        userType: 'NEW_USER',
        loginPopup: true
      });

    case 'PAGE_CHANGE':
      return _objectSpread({}, state, {
        page: action.page
      });

    case 'ROOM_LIST_UPDATE':
      if (state.roomPending) {
        var roomPendingIndex = action.roomList.findIndex(function (room) {
          return room.roomId === state.roomPending.roomId;
        });

        if (roomPendingIndex !== -1) {
          return _objectSpread({}, state, {
            roomList: action.roomList,
            roomPending: action.roomList[roomPendingIndex]
          });
        }
      }

      return _objectSpread({}, state, {
        roomList: action.roomList
      });

    case 'ROOM_CREATE':
      return _objectSpread({}, state, {
        roomPending: action.room
      });

    case 'ROOM_SUBSCRIBE':
      return _objectSpread({}, state, {
        roomPending: action.room
      });

    case 'SESSION_INIT':
      return _objectSpread({}, state, {
        roomPending: action.roomPending,
        winerName: null
      });

    case 'GAME_START':
      return _objectSpread({}, state, {
        roomPending: null
      }, action.gameData, {
        page: 'game',
        blockDown: false
      });

    case 'GAME_UPDATE':
      if (action.gameData.updatedBy !== state.userUuid) {
        action.gameData.tables[state.userUuid] = state.tables[state.userUuid];
      } else if (action.gameData.updatedBy === state.userUuid && action.gameData.tables[state.userUuid].isEnd) {
        return _objectSpread({}, state, {
          roomPending: null
        }, action.gameData, {
          page: 'game',
          blockDown: true
        });
      }

      return _objectSpread({}, state, {
        roomPending: null
      }, action.gameData, {
        page: 'game',
        blockDown: false
      });

    case 'Y_ARROW':
      var newStateY = JSON.parse(JSON.stringify(state)); // { ...state };

      var tableStateY = newStateY.tables[newStateY.userUuid];
      var lengthY = tableStateY.current.cord.y + tableStateY.current.figure.figure[0].length + action.pos;
      var newY = tableStateY.current.cord.y + action.pos;
      var newX = tableStateY.current.cord.x;

      if (lengthY > _configUi["default"].COL || tableStateY.current.cord.y + action.pos < 0 || tableStateY.current.cord.y + action.pos < 0) {
        return newStateY;
      }

      newStateY.tables[newStateY.userUuid].current.cord.y += action.pos;
      newStateY.i = newStateY.i + 1;
      return newStateY;

    case 'X_ARROW':
      var newStateX = JSON.parse(JSON.stringify(state));
      var tableState = newStateX.tables[newStateX.userUuid];
      var lengthX = tableState.current.cord.x + tableState.current.figure.figure.length + action.pos;
      var x = tableState.current.cord.x;
      var y = tableState.current.cord.y;
      var figure = tableState.current.figure.figure;

      if (lengthX > _configUi["default"].ROW || tableState.current.cord.x + action.pos < 0 || tableState.current.cord.y + action.pos < 0) {
        return newStateX;
      }

      newStateX.tables[newStateX.userUuid].current.cord.x += action.pos;
      newStateX.i = newStateX.i + 1;
      return newStateX;

    case 'ROTATE':
      var rotateState = _objectSpread({}, state);

      var d = rotateState.tables[rotateState.userUuid].current.cord.y;

      if (d + action.mat.length > 9) {
        rotateState.tables[rotateState.userUuid].current.cord.y -= 11 - (action.mat.length + d);
      }

      rotateState.tables[rotateState.userUuid].current.figure.figure = action.mat;
      rotateState.i++;
      return rotateState;

    case 'BLOCK_DOWN':
      return _objectSpread({}, state, {
        blockDown: true
      });

    case 'BLOCK_ROW':
      if (action.gameData.updatedBy !== action.gameData.updatedBy) {
        action.gameData.tables[state.userUuid] = state.tables[state.userUuid];
      }

      return _objectSpread({}, state, {
        roomPending: null
      }, action.gameData, {
        page: 'game',
        blockDown: false
      });

    case 'USER_LIST':
      return _objectSpread({}, state, {
        users: action.users
      });

    case 'GAME_END':
      return _objectSpread({}, state, {
        winerName: action.name
      });

    default:
      return state;
  }
};

var _default = reducer;
exports["default"] = _default;