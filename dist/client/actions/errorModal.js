"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setName = exports.ERROR_MODAL = void 0;
var ERROR_MODAL = 'ERROR_MODAL';
exports.ERROR_MODAL = ERROR_MODAL;

var setName = function setName(errorModal) {
  return {
    type: ERROR_MODAL,
    errorModal: errorModal
  };
};

exports.setName = setName;