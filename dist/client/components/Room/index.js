"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _configUi = _interopRequireDefault(require("../../../../etc/config-ui"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Input = _interopRequireDefault(require("@material-ui/core/Input"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _core = require("@material-ui/core");

var _store = _interopRequireDefault(require("../../utils/store"));

var _socket = _interopRequireDefault(require("../../utils/socket"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useStyles = (0, _core.makeStyles)(function (theme) {
  return {
    root: {
      flexGrow: 1
    },
    paper: {},
    button: {
      'margin-top': 30
    }
  };
});

var Room = function Room() {
  var classes = useStyles();

  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      roomName = _useState2[0],
      setRoomName = _useState2[1];

  var handleInput = function handleInput(e, v) {
    setRoomName(e.target.value);
  };

  var handleCreate = function handleCreate(e) {
    var userUuid = _store["default"].getState().userUuid;

    _socket["default"].emit('roomCreate', {
      userUuid: userUuid,
      name: roomName
    });
  };

  return _react["default"].createElement("div", null, _react["default"].createElement(_Typography["default"], {
    variant: "h5",
    color: "inherit",
    paragraph: true
  }, "Create you're own room"), _react["default"].createElement(_Input["default"], {
    autoFocus: true,
    margin: "dense",
    id: "gameCreate",
    titel: "Room name",
    placeholder: "Room name",
    label: "room name",
    onChange: handleInput,
    fullWidth: true
  }), _react["default"].createElement(_Button["default"], {
    variant: "outlined",
    color: "primary",
    onClick: handleCreate,
    className: classes.button
  }, "Do it!"));
};

var _default = Room;
exports["default"] = _default;