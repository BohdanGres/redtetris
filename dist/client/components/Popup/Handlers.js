"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var handleClose = function handleClose(e) {
  setOpen(false);
};

var handleInputChange = function handleInputChange(e, setInputValue) {
  setInputValue(e.target.value);
};

var _default = {
  handleClose: handleClose,
  handleInputChange: handleInputChange
};
exports["default"] = _default;