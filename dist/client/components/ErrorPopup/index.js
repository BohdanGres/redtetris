"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));

var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));

var _DialogContentText = _interopRequireDefault(require("@material-ui/core/DialogContentText"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _reactRedux = require("react-redux");

var _store = _interopRequireDefault(require("../../utils/store"));

var _error = require("./../../actions/error");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var ErrorPopup = function ErrorPopup(_ref) {
  var error = _ref.error;

  var handleClose = function handleClose() {
    _store["default"].dispatch((0, _error.error)(null));
  };

  if (!!error == false) {
    return _react["default"].createElement("div", null);
  }

  return _react["default"].createElement("div", null, _react["default"].createElement(_Dialog["default"], {
    open: !!error,
    onClose: handleClose,
    "aria-labelledby": "error-dialog-title",
    disableBackdropClick: true
  }, _react["default"].createElement(_DialogTitle["default"], {
    id: "error-dialog-title"
  }, "SomeProblem..."), _react["default"].createElement(_DialogContentText["default"], null, error.message, error.field), _react["default"].createElement(_DialogActions["default"], null, _react["default"].createElement(_Button["default"], {
    onClick: handleClose,
    color: "primary"
  }, "Ok("))));
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    error: state.error
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, null)(ErrorPopup); //export default connect(mapStateToProps, null)(withStyles(theme)(Popup));


exports["default"] = _default;