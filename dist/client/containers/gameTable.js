"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _CircularProgress = _interopRequireDefault(require("@material-ui/core/CircularProgress"));

var _styles = require("@material-ui/core/styles");

var _reactRedux = require("react-redux");

var _Room = _interopRequireDefault(require("./../components/Room"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _GameRow = _interopRequireDefault(require("../components/GameRow"));

var _MyRoom = _interopRequireDefault(require("./../components/MyRoom"));

var _socket = _interopRequireDefault(require("./../utils/socket"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      flexGrow: 1
    },
    paper: {
      /*
          height: 200,
      */
      width: 600,
      'margin-top': 50,
      padding: 20
    },
    control: {
      padding: theme.spacing(2)
    },
    progress: {
      margin: theme.spacing(2),
      width: 600
    },
    button: {
      'margin-top': 30
    }
  };
});

var GameTable = function GameTable(_ref) {
  var roomPending = _ref.roomPending,
      roomList = _ref.roomList,
      userUuid = _ref.userUuid;

  var _useState = (0, _react.useState)(2),
      _useState2 = _slicedToArray(_useState, 2),
      spacing = _useState2[0],
      setSpacing = _useState2[1];

  var classes = useStyles();

  function handleChange(event, value) {
    setSpacing(Number(value));
  }

  var _useState3 = (0, _react.useState)(''),
      _useState4 = _slicedToArray(_useState3, 2),
      input = _useState4[0],
      setInput = _useState4[1];

  var handleInput = function handleInput(e, v) {
    setInput(v);
  };

  return _react["default"].createElement(_Grid["default"], {
    container: true,
    className: classes.root,
    spacing: 10
  }, _react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 12
  }, _react["default"].createElement(_Grid["default"], {
    container: true,
    justify: "center",
    spacing: spacing
  }, _react["default"].createElement(_Grid["default"], {
    key: 1,
    item: true
  }, _react["default"].createElement(_Paper["default"], {
    className: classes.paper
  }, !roomPending ? _react["default"].createElement(_Room["default"], null) : (0, _MyRoom["default"])(roomPending, userUuid))), _react["default"].createElement(_Grid["default"], {
    key: 2,
    item: true
  }, _react["default"].createElement(_Paper["default"], {
    className: classes.paper
  }, _react["default"].createElement(_Typography["default"], {
    variant: "h5",
    color: "inherit",
    paragraph: true
  }, "Room list"), !roomList.length ? _react["default"].createElement(_CircularProgress["default"], {
    className: classes.progress,
    color: "secondary"
  }) : _react["default"].createElement(_List["default"], null, roomList.map(function (room, i) {
    return (0, _GameRow["default"])(room, i, !!roomPending);
  })))))));
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    roomPending: state.roomPending,
    roomList: state.roomList,
    userUuid: state.userUuid
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, null)(GameTable);

exports["default"] = _default;