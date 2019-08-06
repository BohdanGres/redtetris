"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeServiceRunner = makeServiceRunner;

var _runError = _interopRequireDefault(require("./runError"));

var _logger = _interopRequireDefault(require("./../utils/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function makeServiceRunner(actionClass,
/* istanbul ignore next */
params, context) {
  return (
    /*#__PURE__*/
    function () {
      var _serviceRunner = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref) {
        var req, res, resultPromise;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                req = _ref.req, res = _ref.res;
                _context.prev = 1;
                _context.next = 4;
                return runService(actionClass, {
                  params: params,
                  context: context
                });

              case 4:
                resultPromise = _context.sent;
                _context.next = 11;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](1);
                returnError(req, res, _context.t0);
                return _context.abrupt("return");

              case 11:
                ppResult(req, res, resultPromise);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 7]]);
      }));

      function serviceRunner(_x) {
        return _serviceRunner.apply(this, arguments);
      }

      return serviceRunner;
    }()
  );
}

function runService(_x2, _x3) {
  return _runService.apply(this, arguments);
}

function _runService() {
  _runService = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(service, _ref2) {
    var _ref2$context, context, _ref2$params, params, res;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ref2$context = _ref2.context, context = _ref2$context === void 0 ? {} : _ref2$context, _ref2$params = _ref2.params, params = _ref2$params === void 0 ? {} : _ref2$params;
            _context2.prev = 1;
            _context2.next = 4;
            return new service(context).run(params);

          case 4:
            res = _context2.sent;
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](1);
            throw _context2.t0;

          case 10:
            return _context2.abrupt("return", res);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 7]]);
  }));
  return _runService.apply(this, arguments);
}

function ppResult(req, res, promise) {
  var result = promise;
  res.send(result);
}

function returnError(req, res, error) {
  _logger["default"].info(error);

  if (error.field) {
    var _error;

    res.send({
      type: 'errorPopup',
      Status: 0,
      error: (_error = {}, _defineProperty(_error, error.field, error.message), _defineProperty(_error, "message", error.message), _error)
    });
    return;
  }

  res.sendError({
    Status: 0,
    Message: 'Server ERROR'
  });
} // export funcmakeServiceRunner;