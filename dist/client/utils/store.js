"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getInitialState = void 0;

var _cookie = _interopRequireDefault(require("./cookie"));

var _configUi = _interopRequireDefault(require("../../../etc/config-ui"));

var _redux = require("redux");

var _index = _interopRequireDefault(require("../reducers/index"));

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reduxLogger = _interopRequireDefault(require("redux-logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var geUserStatus = function geUserStatus() {
  var type = 'LOGED';
  var loginPopup = false;

  var userUuid = _cookie["default"].getCookie('uuid');

  var userName = _cookie["default"].getCookie('userName');

  if (!userUuid && !userName) {
    type = 'NEW_USER';
    loginPopup = true;
  }

  if (!userUuid && userName) {
    type = 'OLD_USER';
    loginPopup = true;
  }

  return {
    userUuid: userUuid,
    userName: userName,
    userType: type,
    loginPopup: loginPopup
  };
};

var getInitialState = function getInitialState() {
  return _objectSpread({}, geUserStatus(), {
    array: [],
    page: 'home',
    i: 0,
    width: _configUi["default"].COLUMN,
    height: _configUi["default"].ROW,
    error: null,
    roomPending: null,
    roomList: [],
    blockDown: false,
    users: [],
    winerName: null
  });
};

exports.getInitialState = getInitialState;
var composeEnhancers = process.env.NODE_ENV !== 'production' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose : // eslint-disable-line
_redux.compose;
var store = (0, _redux.createStore)(_index["default"], getInitialState(), composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk["default"])));
var _default = store;
exports["default"] = _default;