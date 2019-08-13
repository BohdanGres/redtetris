"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _styles = require("@material-ui/core/styles");

var _reactRedux = require("react-redux");

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _UserRow = _interopRequireDefault(require("./../components/UserRow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      flexGrow: 1
    },
    paper: {
      /*
          height: 200,
      */
      width: '80%',
      'margin-top': 50,
      padding: '10%'
    },
    button: {
      'margin-top': 30
    }
  };
});

var Users = function Users(_ref) {
  var users = _ref.users;
  var classes = useStyles();
  return _react["default"].createElement(_Grid["default"], {
    container: true,
    className: classes.root
  }, _react["default"].createElement(_Grid["default"], {
    xs: 1
  }), _react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 10
  }, _react["default"].createElement(_Grid["default"], {
    container: true,
    justify: "center"
  }, _react["default"].createElement(_Paper["default"], {
    className: classes.paper
  }, _react["default"].createElement(_Typography["default"], {
    variant: "h5",
    color: "inherit"
  }, "User list"), _react["default"].createElement(_List["default"], null, users.map(function (user, i) {
    return (0, _UserRow["default"])(_objectSpread({}, user, {
      i: i
    }));
  }))))));
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    users: state.users
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, null)(Users);

exports["default"] = _default;