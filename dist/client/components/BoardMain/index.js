"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _index = require("./../Row/index");

var _reactRedux = require("react-redux");

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _core = require("@material-ui/core");

var _socket = _interopRequireDefault(require("./../../utils/socket"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useStyles = (0, _core.makeStyles)(function (theme) {
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

var buildRow = function buildRow(_ref) {
  var table = _ref.table;
  var row = table.map(function (row, i) {
    return _react["default"].createElement(_index.Row, {
      key: i,
      row: row
    });
  });
  return row;
}; // buildRow()


var mapTable = function mapTable(_ref2) {
  var table = _ref2.table,
      current = _ref2.current;
  if (!current.figure) return table;
  var figure = current.figure.figure;
  var cord = current.cord;
  var newTable = table.map(function (tr) {
    return _toConsumableArray(tr);
  });
  figure.map(function (tr, i, arr) {
    tr.map(function (th, j, ar) {
      newTable[i + cord.x][j + cord.y] = th ? th : newTable[i + cord.x][j + cord.y];
    });
  });
  return newTable;
};

var mapOtherTabe = function mapOtherTabe(table) {
  var board = _toConsumableArray(table);

  var colored = [];
  board.forEach(function (tr, i, table) {
    tr.forEach(function (cell, j, row) {
      var k = i;

      if (cell > 0 && !colored.includes(j)) {
        while (k < 20) {
          table[k][j] = 1;
          k++;
        }

        colored.push(j);
      }
    });
  });
  return board;
};

var otherBoard = function otherBoard() {
  var tables = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return tables.map(function (board) {
    return _react["default"].createElement(_Grid["default"], {
      item: true,
      md: 6
    }, _react["default"].createElement("div", {
      className: "board ".concat(board.isEnd ? 'looser' : '')
    }, buildRow({
      table: mapOtherTabe(board.table)
    })));
  });
};

var BoardMain = function BoardMain(_ref3) {
  var width = _ref3.width,
      height = _ref3.height,
      array = _ref3.array,
      gameData = _ref3.gameData,
      tables = _ref3.tables,
      userUuid = _ref3.userUuid;
  var classes = useStyles();

  if (!tables || !tables[userUuid]) {
    _socket["default"].emit('getGame', {
      playerId: userUuid
    });

    return '';
  }

  var newTable = {
    table: mapTable(tables[userUuid]),
    isEnd: tables[userUuid].isEnd
  };
  var otherTable = [];
  Object.keys(tables).forEach(function (tblId) {
    if (tblId !== userUuid) {
      otherTable.push({
        table: tables[tblId].table,
        isEnd: tables[tblId].isEnd
      });
    }
  });
  var leftTable = otherTable.splice(0, 2);
  return _react["default"].createElement("div", null, _react["default"].createElement(_Grid["default"], {
    container: true
  }, _react["default"].createElement(_Grid["default"], {
    item: true,
    md: 4
  }, _react["default"].createElement(_Grid["default"], {
    container: true
  }, leftTable && leftTable.length ? otherBoard(leftTable) : '')), _react["default"].createElement(_Grid["default"], {
    item: true,
    md: 4
  }, _react["default"].createElement("div", {
    className: "mainBoard ".concat(newTable.isEnd ? 'looser' : '')
  }, buildRow(newTable))), _react["default"].createElement(_Grid["default"], {
    item: true,
    md: 4
  }, _react["default"].createElement(_Grid["default"], {
    container: true
  }, otherTable && otherTable.length ? otherBoard(otherTable) : ''))));
};

var mapStateToProps = function mapStateToProps(state) {
  return state;
};

var _default = (0, _reactRedux.connect)(mapStateToProps, null)(BoardMain);

exports["default"] = _default;