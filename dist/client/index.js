"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactRedux = require("react-redux");

var _router = _interopRequireDefault(require("./utils/router"));

var _store = _interopRequireDefault(require("./utils/store"));

var _Popup = _interopRequireDefault(require("./components/Popup"));

var _ErrorPopup = _interopRequireDefault(require("./components/ErrorPopup"));

var _WinerPopup = _interopRequireDefault(require("./components/WinerPopup"));

var _eventListener = _interopRequireDefault(require("./utils/eventListener"));

var _urlParse = _interopRequireDefault(require("./utils/urlParse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// socket.emit('action', { type: 'init'} );
// socket.emit('roomList', {} );
// socket.emit('initSession', getUserState());
(0, _eventListener["default"])();
(0, _urlParse["default"])();
var app = document.getElementById('tetris');

_reactDom["default"].render(_react["default"].createElement(_reactRedux.Provider, {
  store: _store["default"]
}, _react["default"].createElement(_router["default"], null), _react["default"].createElement(_Popup["default"], null), _react["default"].createElement(_ErrorPopup["default"], null), _react["default"].createElement(_WinerPopup["default"], null)), app);