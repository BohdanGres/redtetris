"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Home;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _CssBaseline = _interopRequireDefault(require("@material-ui/core/CssBaseline"));

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _Card = _interopRequireDefault(require("@material-ui/core/Card"));

var _CardActionArea = _interopRequireDefault(require("@material-ui/core/CardActionArea"));

var _CardContent = _interopRequireDefault(require("@material-ui/core/CardContent"));

var _CardMedia = _interopRequireDefault(require("@material-ui/core/CardMedia"));

var _Hidden = _interopRequireDefault(require("@material-ui/core/Hidden"));

var _Container = _interopRequireDefault(require("@material-ui/core/Container"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    toolbar: {
      borderBottom: "1px solid ".concat(theme.palette.divider)
    },
    toolbarTitle: {
      flex: 1
    },
    toolbarSecondary: {
      justifyContent: 'space-between',
      overflowX: 'auto'
    },
    toolbarLink: {
      padding: theme.spacing(1),
      flexShrink: 0
    },
    mainFeaturedPost: {
      position: 'relative',
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      marginBottom: theme.spacing(4),
      backgroundImage: 'url(https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/f_auto,q_auto,w_1100/v1555300439/shape/mentalfloss/primary-tetris.png)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,.3)'
    },
    mainFeaturedPostContent: _defineProperty({
      position: 'relative',
      padding: theme.spacing(3)
    }, theme.breakpoints.up('md'), {
      padding: theme.spacing(6),
      paddingRight: 0
    }),
    mainGrid: {
      marginTop: theme.spacing(3)
    },
    card: {
      display: 'flex'
    },
    cardDetails: {
      flex: 1
    },
    cardMedia: {
      width: 160
    },
    markdown: _objectSpread({}, theme.typography.body2, {
      padding: theme.spacing(3, 0)
    }),
    sidebarAboutBox: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.grey[200]
    },
    sidebarSection: {
      marginTop: theme.spacing(3)
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      marginTop: theme.spacing(8),
      padding: theme.spacing(6, 0)
    }
  };
});
var featuredPosts = [{
  title: 'I make it',
  date: 'Nov 12',
  description: 'This is a wider card with supporting text below as a natural lead-in to additional content.'
}, {
  title: 'And i too',
  date: 'Nov 11',
  description: 'This is a wider card with supporting text below as a natural lead-in to additional content.'
}];

function Home() {
  var classes = useStyles();
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_CssBaseline["default"], null), _react["default"].createElement(_Container["default"], {
    maxWidth: "lg"
  }, _react["default"].createElement(_Toolbar["default"], {
    className: classes.toolbar
  }), _react["default"].createElement("main", null, _react["default"].createElement(_Paper["default"], {
    className: classes.mainFeaturedPost
  }, _react["default"].createElement("div", {
    className: classes.overlay
  }), _react["default"].createElement(_Grid["default"], {
    container: true
  }, _react["default"].createElement(_Grid["default"], {
    item: true,
    md: 6
  }, _react["default"].createElement("div", {
    className: classes.mainFeaturedPostContent
  }, _react["default"].createElement(_Typography["default"], {
    component: "h1",
    variant: "h3",
    color: "inherit",
    gutterBottom: true
  }, "Red Tetris - online multiplayer tetris. Enjoi it!"), _react["default"].createElement(_Typography["default"], {
    variant: "h5",
    color: "inherit",
    paragraph: true
  }, "Was made for fun and to be rated at 125 balls! Hope you like it!!!!!!!"))))), _react["default"].createElement(_Grid["default"], {
    container: true,
    spacing: 4,
    className: classes.cardGrid
  }, featuredPosts.map(function (post) {
    return _react["default"].createElement(_Grid["default"], {
      item: true,
      key: post.title,
      xs: 12,
      md: 6
    }, _react["default"].createElement(_CardActionArea["default"], {
      component: "a",
      href: "#"
    }, _react["default"].createElement(_Card["default"], {
      className: classes.card
    }, _react["default"].createElement("div", {
      className: classes.cardDetails
    }, _react["default"].createElement(_CardContent["default"], null, _react["default"].createElement(_Typography["default"], {
      component: "h2",
      variant: "h5"
    }, post.title), _react["default"].createElement(_Typography["default"], {
      variant: "subtitle1",
      color: "textSecondary"
    }, post.date), _react["default"].createElement(_Typography["default"], {
      variant: "subtitle1",
      paragraph: true
    }, post.description))), _react["default"].createElement(_Hidden["default"], {
      xsDown: true
    }, _react["default"].createElement(_CardMedia["default"], {
      className: classes.cardMedia,
      image: post.url,
      title: "Image title"
    })))));
  })))));
}