"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _DialogContentText = _interopRequireDefault(require("@material-ui/core/DialogContentText"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _Input = _interopRequireDefault(require("@material-ui/core/Input"));

var _store = _interopRequireDefault(require("../../utils/store"));

var _socket = _interopRequireDefault(require("../../utils/socket"));

var _clearStore = require("./../../actions/clearStore");

var _store2 = require("./../../utils/store");

var _cookie = require("../../utils/cookie");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AcountConfirm = function AcountConfirm(_ref) {
  var handleClose = _ref.handleClose,
      inputValue = _ref.inputValue,
      userName = _ref.userName,
      handlePassChange = _ref.handlePassChange,
      passValue = _ref.passValue;

  var handleSubmit = function handleSubmit() {
    var userUuid = _store["default"].getState().userUuid;

    _socket["default"].emit('userCheck', {
      name: userName,
      password: passValue
    });
  };

  var handleCancel = function handleCancel() {
    (0, _cookie.setCookie)('uuid', '', 1);
    (0, _cookie.setCookie)('userName', '', 10);

    _store["default"].dispatch((0, _clearStore.clearStore)((0, _store2.getInitialState)()));
  };

  return _react["default"].createElement("div", null, _react["default"].createElement(_DialogContent["default"], null, _react["default"].createElement(_DialogContentText["default"], null, "Hi ", userName, ", hello again! Is this your username? If yes pleas enter you're password"), _react["default"].createElement(_Input["default"], {
    autoFocus: true,
    margin: "dense",
    id: "PasswordCheck",
    label: "Password confirm",
    onChange: handlePassChange,
    type: "password",
    fullWidth: true
  })), _react["default"].createElement(_DialogActions["default"], null, _react["default"].createElement(_Button["default"], {
    onClick: handleSubmit,
    color: "primary"
  }, "Yep!"), _react["default"].createElement(_Button["default"], {
    onClick: handleCancel,
    color: "primary"
  }, "Unfortunately no((")));
};

var _default = AcountConfirm;
exports["default"] = _default;