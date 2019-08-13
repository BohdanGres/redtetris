"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _setName = require("../actions/setName");

var _socket = _interopRequireDefault(require("./../utils/socket"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var name = '';

var handleSubmit = function handleSubmit(e) {
  e.preventDefault();

  _socket["default"].emit('action', {
    type: 'setName',
    body: {
      name: name
    }
  });
};

var handleChange = function handleChange(val, e) {
  name = val;
};

var Login = function Login() {
  return _react["default"].createElement("h1", null, ",");
  /* return (
     <form onSubmit={handleSubmit}>
       <label>
         Name:
         <input type="text" /!* value={name} *!/ name="name"
                onChange={e => handleChange(e.target.value, e)} />
       </label>
       <input type="submit" value="Submit" />
     </form>
   );*/
};

var _default = Login;
/*const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}
export default connect(mapStateToProps, null)(App)*/

exports["default"] = _default;