"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = initRequestRouter;

var _fs = _interopRequireDefault(require("fs"));

var _debug = _interopRequireDefault(require("debug"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var logerror = (0, _debug["default"])('tetris:error');

function initRequestRouter(req, res) {
  // if (req.url == 'test')
  var file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html';

  _fs["default"].readFile(__dirname + file, function (err, data) {
    if (err) {
      logerror(err);
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}