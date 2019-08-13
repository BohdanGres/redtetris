"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _app = _interopRequireDefault(require("./../containers/app"));

var _login = _interopRequireDefault(require("./../containers/login"));

var _gameTable = _interopRequireDefault(require("./../containers/gameTable"));

var _home = _interopRequireDefault(require("./../containers/home"));

var _reactRedux = require("react-redux");

var _react = _interopRequireDefault(require("react"));

var _Header = _interopRequireDefault(require("./../components/Header"));

var _users = _interopRequireDefault(require("./../containers/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getPage = function getPage(_ref) {
  var page = _ref.page,
      roomPending = _ref.roomPending;
  var thisPage = page;
  if (roomPending && roomPending.status === 'IN GAME') thisPage = 'game';
  if (roomPending && roomPending.status === 'pending') thisPage = 'game_rooms';

  switch (thisPage) {
    case 'home':
      return _react["default"].createElement(_home["default"], null);
      break;

    case 'game_rooms':
      return _react["default"].createElement(_gameTable["default"], null);
      break;

    case 'game':
      return _react["default"].createElement(_app["default"], null);

    case 'user_scores':
      return _react["default"].createElement(_users["default"], null);

    default:
      return _react["default"].createElement(_gameTable["default"], null);
      break;
  }
};

var Router = function Router(_ref2) {
  var page = _ref2.page,
      roomPending = _ref2.roomPending;
  return _react["default"].createElement("div", null, _react["default"].createElement(_Header["default"], null), getPage({
    page: page,
    roomPending: roomPending
  }));
};

var mapStateToProps = function mapStateToProps(state) {
  return state;
};

var _default = (0, _reactRedux.connect)(mapStateToProps, null)(Router);

exports["default"] = _default;