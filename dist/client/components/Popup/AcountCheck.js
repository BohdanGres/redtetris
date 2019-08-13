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

var _socket = _interopRequireDefault(require("./../../utils/socket"));

var _store = _interopRequireDefault(require("./../../utils/store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AcountCheck = function AcountCheck(_ref) {
  var inputValue = _ref.inputValue,
      handleInputChange = _ref.handleInputChange,
      passValue = _ref.passValue,
      handlePassChange = _ref.handlePassChange;

  var handleSubmit = function handleSubmit() {
    var userUuid = _store["default"].getState().userUuid;

    _socket["default"].emit('userCreate', {
      name: inputValue,
      password: passValue
    });
  };

  return _react["default"].createElement("div", null, _react["default"].createElement(_DialogContent["default"], null, _react["default"].createElement(_DialogContentText["default"], null, "Logged in for the first time? Enter your username and password please"), _react["default"].createElement(_Input["default"], {
    autoFocus: true,
    value: inputValue,
    margin: "dense",
    id: "Username",
    label: "Username",
    onChange: handleInputChange,
    type: "email",
    placeholder: "username",
    fullWidth: true
  }), _react["default"].createElement(_Input["default"], {
    autoFocus: true,
    value: passValue,
    margin: "dense",
    id: "password",
    label: "password",
    onChange: handlePassChange,
    type: "password",
    placeholder: "password",
    fullWidth: true
  })), _react["default"].createElement(_DialogActions["default"], null, _react["default"].createElement(_Button["default"], {
    onClick: handleSubmit,
    color: "primary"
  }, "Ok")));
};

var _default = AcountCheck;
exports["default"] = _default;