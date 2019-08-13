"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));

var _core = require("@material-ui/core");

var _reactRedux = require("react-redux");

var _cookie = require("../../utils/cookie");

var _socket = _interopRequireDefault(require("../../utils/socket"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var WinerPopup = function WinerPopup(_ref) {
  var winerName = _ref.winerName;
  var initial = winerName !== null;

  var handleClose = function handleClose(e) {
    _socket["default"].emit('initSession', (0, _cookie.getUserState)());

    _socket["default"].emit('roomList', {});

    _socket["default"].emit('userList', {});
  };

  return _react["default"].createElement("div", null, _react["default"].createElement(_Dialog["default"], {
    open: initial,
    onClose: handleClose,
    "aria-labelledby": "form-dialog-title",
    disableBackdropClick: true,
    disableEscapeKeyDown: true
  }, _react["default"].createElement(_DialogTitle["default"], {
    id: "form-dialog-title"
  }, "This guy winner "), _react["default"].createElement(_core.DialogContentText, null, " ", winerName, " "), _react["default"].createElement(_Button["default"], {
    onClick: handleClose,
    color: "primary"
  }, "Yep!")));
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    winerName: state.winerName
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, null)(WinerPopup);

exports["default"] = _default;